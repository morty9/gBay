const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    startDate: {
      type: Date,
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });
}
