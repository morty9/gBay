const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    username: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }]
  });

  schema.plugin(timestamps);
  return api.mongoose.model('User', schema);

};
