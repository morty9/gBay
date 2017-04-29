const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;
  const Product = api.models.Product;

  function create(req, res, next) {
    let user = new User(req.body);
    user.password = sha1(user.password);

    User.findOne({
      email: user.email,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('email.already.exists');
      }

      User.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        }

        return saveUser();
      });

    });

    function saveUser() {
      user.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);

      });
    }
  }

  function findOne(req, res, next) {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    setTimeout(getUsers, 3000);
    function getUsers() {
      User.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data || data.length == 0) {
          return res.status(204).send(data);
        }

        //api.middlewares.cache.set('User', data, req.originalUrl);
        return res.send(data);
      });
    }
  }

  function findAllSeller(req, res, next) {
    let user = new User(req.body);
    let i = 0;
    let sellers = [];

    setTimeout(getSellers, 3000);
    function getSellers() {
      User.find((err, data) => {
        console.log('data',data);
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(401).send('no.data');
        }
        console.log('data.length', data.length);
        console.log('data[i]', data[3].seller);
        while (i <= data.length) {
          if (data[i].seller) {
            console.log('user',user);
            sellers.push(user);
          }
          i += 1;
        }

        return res.send(sellers);
      });
    }
  }

  function updateUsers(req, res, next) {
    let user = new User(req.body);

    User.findOne({
      email: user.email,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('email.already.exists');
      }

      return updateUser();
    });

    function updateUser() {
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

  function addCredit(req, res, next) {
    let user = new User(req.body);

    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      if (req.body.credit < 1) {
        return res.status(401).send('invalid.credit');
      }

      if (data.credit != null) {
        req.body.credit = data.credit += user.credit;
        return updateCredit();
      }
      return updateCredit();
    });

    function updateCredit() {
      User.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });

    }
  }

  return {
    create,
    findOne,
    findAll,
    findAllSeller,
    updateUsers,
    remove,
    addCredit
  };

}
