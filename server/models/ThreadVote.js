const mongoose = require('mongoose');
const Schema = mongoose.Schema

const threadSchema = new Schema({
  thread: {type: Schema.Types.ObjectId, ref: "Thread"},
  author: {type: Schema.Types.ObjectId, ref: "User"}
}, {
  timestamps: true
})

const ThreadV = mongoose.model('ThreadV', threadSchema)

module.exports = ThreadV;
