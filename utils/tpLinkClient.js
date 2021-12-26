const { login } = require("@milanmdev/tplink-cloud-api");

const tpLinkClient = async () => {
  try {
    var tplink = await login(process.env.TP_EMAIL, process.env.TP_PASSWORD);
    return tplink;
  } catch (error) {
    console.error(error);
    return tplink;
  }
};

module.exports = tpLinkClient();
