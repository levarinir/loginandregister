const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = new mongoose.Schema(
  {
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Map', mapSchema);
