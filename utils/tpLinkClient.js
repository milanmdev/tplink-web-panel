const { login } = require("tplink-cloud-api");

const tpLinkClient = async () => {
  if (!process.env.TP_EMAIL || !process.env.TP_PASSWORD)
    throw new Error(
      "Please set TP_EMAIL and TP_PASSWORD environment variables"
    );

  const tplink = await login(process.env.TP_EMAIL, process.env.TP_PASSWORD);
  return tplink;
};

export default tpLinkClient;
