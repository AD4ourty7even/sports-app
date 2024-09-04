const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
  },

  comments: [
    {
      user: {
        type: String,
        
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  asset_id: {
    type: String,
    required: true
  },
  user: {
    type: String,
  },
  playback_id: {
    type: String,
    required: true
  }
});

module.exports = Video = mongoose.model('video', VideoSchema);
