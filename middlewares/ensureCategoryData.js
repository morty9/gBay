module.exports = (req, res, next) => {
  if (!req.body || !req.body.title || req.body.description) {
    return res.status(400).send('missing.fields');
  }
  return next();
}
