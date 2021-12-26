// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const client = -require("../../utils/tpLinkClient");

export default function helloAPI(req, res) {
  console.log(client);
  res.status(200).json({ name: "John Doe" });
}
