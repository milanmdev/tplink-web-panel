const initialClient = require("../../utils/tpLinkClient");
const { Device } = require("../../utils/models/device");

export default async function devicesAPI(req, res) {
  let client = await initialClient;

  let deviceList = await client.getDeviceList().catch((e) => undefined);
  if (!deviceList)
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });

  let devices = await Promise.all(
    deviceList.map(async (device) => {
      let deviceData = await client.newDevice(device);
      if (!device) return null;
      let extraData = {
        status: await deviceData.getRelayState(),
        powerConsumption: device.getPowerUsage
          ? await device.getPowerUsage()
          : null,
      };

      return new Device(device, extraData);
    })
  );
  res.status(200).json(devices);
}
