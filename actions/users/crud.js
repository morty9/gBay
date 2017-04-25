const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;

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
    console.log(user.credit);
    User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      console.log(data);
      console.log(data.credit);
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data < 0) {
        return res.status(204).send(data);
      }

      if (user.credit < 1) {
        return res.status(204).send('invalid.credit');
      }

      if(data.credit != 0) {
        console.log("data2",data);
        data.credit += user.credit;

        // data.update((err, data) => {
        //   if (err) {
        //     return res.status(500).send(err);
        //   }
        //
        //   if (!data) {
        //     return res.status(204).send(data);
        //   }
        //
        //   return res.send(data);
        // })
        console.log("data3", data);
        return res.send(data);
      }

      return res.send(data);
    });
  }

  return {
    create,
    findOne,
    findAll,
    updateUsers,
    remove,
    addCredit
  };

}
