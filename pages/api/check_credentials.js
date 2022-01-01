export default async function checkCredentialsAPI(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method now allowed" });
  if (!req.body || !req.body.username || !req.body.password)
    return res.status(400).send("Bad request");

  if (
    req.body.username !== process.env.AUTH_USERNAME ||
    req.body.password !== process.env.AUTH_PASSWORD
  )
    return res
      .status(401)
      .send({ valid: false, message: "Invalid credentials" });
  res.status(200).json({ valid: true });
}
