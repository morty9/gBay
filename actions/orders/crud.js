module.exports = (api) => {
  const Order = api.models.Order;

  function create(req, res, next) {
    let order = new Order(req.body);

    Order.findOne({
      number: order.number,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('order.already.exists');
      }

      Order.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        }

        return saveOrder();
      });
    });

    function saveOrder() {
      order.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);
      });
    }
  }

    function findOne(req, res, next) {
      Order.findById(req.params.id, (err, data) => {
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
      Order.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data || data.length == 0) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    function update(req, res, next) {
      Order.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
      Order.findByIdAndRemove(req.params.id, (err, data) => {
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
     findOne,
     findAll,
     update,
     remove
   };

}
