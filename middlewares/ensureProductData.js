module.exports = (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.description || !req.body.picture || !req.body.date || !req.body.price || !req.statuSell) {
    return res.status(400).send('missing.fields');
  }
  return next();
}
