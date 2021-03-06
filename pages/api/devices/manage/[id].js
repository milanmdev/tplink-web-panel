const initialClient = require("../../../../utils/tpLinkClient");
const { Device } = require("../../../../utils/models/device");

export default async function deviceAPI(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method now allowed" });
  if (!req.query || !req.query.id || !req.body)
    return res.status(400).send("Bad request");
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

  let deviceFetch = await client.findDevice(req.query.id);
  if (!deviceFetch)
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  let device = await client.newDevice(deviceFetch);
  if (!device)
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });

  if (typeof req.body.status == "boolean") {
    await device.toggle();
  }

  let extraData = {
    status: await device.getRelayState(),
    powerConsumption: device.getPowerUsage
      ? await device.getPowerUsage()
      : null,
  };

  res.status(200).json(new Device(device.device, extraData));
}
