module.exports = (req, res, next) => {
  if (!req.body || !req.body.startDate) {
    return res.status(400).send('missing.fields');
  }
  return next();
}
