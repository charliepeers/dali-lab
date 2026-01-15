const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: {type: Number, required: true},
  dev: {type: Boolean, required: true},
  des: {type: Boolean, required: true},
  pm: {type: Boolean, required: true},
  core: {type: Boolean, required: true},
  mentor: {type: Boolean, required: true},
  major: {type: String, required: true},
  minor: {type: String, required: false},
  birthday: {type: String, required: false},
  home: {type: String, required: false},
  quote: {type: String, required: false},
  favoriteThing1: {type: String, required: false},
  favoriteThing2: {type: String, required: false},
  favoriteThing3: {type: String, required: false},
  favoriteDartmouthTradition: {type: String, required: false},
  funFact: {type: String, required: false},
  picture: {type: String, required: false},
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);

