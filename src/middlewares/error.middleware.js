export default function (err, req, res, next) {
  console.log("!!! Error !!!");
  console.log(err.code, err.message);

  res.status(err.status || 500);
  res.json({ err: err.message });
}
