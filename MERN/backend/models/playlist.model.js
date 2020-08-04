const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  link: { type: String, required: true, unique: true },
  emotion: {type: String, required: true },
  age: {type: Number, required: true },
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist
