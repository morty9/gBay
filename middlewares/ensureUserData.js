module.exports = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.fullName) {
    return res.status(400).send('missing.fields');
  }
  return next();
}
