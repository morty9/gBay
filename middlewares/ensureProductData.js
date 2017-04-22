module.exports = (api) => {
  return (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.description || !req.body.picture || !req.body.date || !req.body.price || !req.statuSell) {
      return res.status(400).send('missing.fields');
    }
    next();
  };
}
