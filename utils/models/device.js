exports.Device = class Device {
  constructor(device, extraData) {
    if (!device) return null;

    try {
      var model = device.deviceModel.split("(")[0];
    } catch (e) {
      var model = null;
    }

    this.id = device.deviceId;
    this.model = model;
    this.name = device.deviceName;
    this.alias = device.alias;
    this.region = device.deviceRegion;
    this.hardwareVersion = device.deviceHwVer;
    this.type = device.deviceType;
    this.status = extraData.status;
    this.powerConsumption = extraData.powerConsumption;
  }
};
