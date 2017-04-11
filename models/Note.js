const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    note: {
      type: Number,
      required: false
    },
    comment: {
      type: String,
      required: false
    }
  });
}
