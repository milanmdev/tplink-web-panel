const initialClient = require("../../utils/tpLinkClient");
const { Device } = require("../../utils/models/device");

export default async function devicesAPI(req, res) {
  /* Authroization */
  if (!req.headers || !req.headers.authorization)
    return res.status(401).send("Unauthorized");
  let authorization = req.headers.authorization.split(" ");
  if (!authorization) return res.status(401).send("Unauthorized");
  if (
    authorization[0] !== process.env.AUTH_USERNAME ||
    authorization[1] !== process.env.AUTH_PASSWORD
  )
    return res.status(401).send("Unauthorized");

  let client = await initialClient;

  let deviceList = await client.getDeviceList().catch((e) => undefined);
  if (!deviceList)
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });

  let devices = await Promise.all(
    deviceList.map(async (device) => {
      try {
        if (!device) return null;
        let deviceData = await client.newDevice(device);
        if (!deviceData) return null;
        let extraData = {
          status: await deviceData.getRelayState(),
          powerConsumption: device.getPowerUsage
            ? await device.getPowerUsage()
            : null,
        };

        return new Device(device, extraData);
      } catch (e) {
        return null;
      }
    })
  );
  res.status(200).json(devices);
}
