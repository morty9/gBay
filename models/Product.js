const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
  const schema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    picture: [{
      type: String,
      required: true
    }],
    startDate: {
      type: Date,
      required: true
    },
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: [{
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }]

  })
}
