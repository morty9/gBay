const sha1 = require('sha1');

module.exports = (api) => {
  const Opinion = api.models.Opinion;
  const User = api.models.User;

  function create(req, res, next) {
    let opinion = new Opinion(req.body);

    function saveOpinion() {
      opinion.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(data);
      });
    }
  }

  function findAll(req, res, next) {
    function getOpinion() {
      Opinion.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data || data.length == 0) {
          return res.status(204).send(data);
        }
        return res.send(data);
      });
    }
  }

  function update() {
    User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function remove(req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  return {
    create,
    findAll,
    update,
    remove
  };
}
