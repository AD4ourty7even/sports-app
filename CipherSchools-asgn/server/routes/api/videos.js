const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const axios = require('axios')


// Video model
const Video = require('../../models/Video');




// @route   GET api/videos/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Video.find()
    .sort({ date: -1 })
    .then(vids => res.json(vids))
    .catch(err => res.status(404).json({ error: err, novidsfound: 'No videos found' }));
});


// @route   GET api/videos/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Video.findById(req.params.id)
    .then(v => {
      res.json(v).status(200)
      
    })
    .catch(err =>
      res.status(404).json({ error: err, novidfound: 'No video found with that ID' })
    );
});

// @route   POST api/videos
// @desc    Create post
// @access  Private
router.post(
  '/',
  (req, res) => {
    const isValid = true
    
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newVideo = new Video({
      title: req.body.title,
      duration: req.body.duration,
      asset_id: req.body.asset_id,
      playback_id: req.body.playback_id,
      user: req.body.user
      
    });

    newVideo.save().then(v => res.status(200).json({video: v, msg: "successfully saved"}))
    .catch(err => res.status(400).json({error: err}));
  }
);

// @route   DELETE api/videos/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  (req, res) => {
   
      Video.findById(req.params.id)
        .then(v => {
          
          // Delete
          v.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ vidnotfound: 'No vid found' }));
  }
);

// // @route   POST api/posts/like/:id
// // @desc    Like post
// // @access  Private
// router.post(
//   '/like/:id',
  
//   (req, res) => {
    
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyliked: 'User already liked this post' });
//           }

//           // Add user id to likes array
//           post.likes.unshift({ user: req.user.id });

//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
//   }
// );

// // @route   POST api/posts/unlike/:id
// // @desc    Unlike post
// // @access  Private
// router.post(
//   '/unlike/:id',
  
//   (req, res) => {
    
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length === 0
//           ) {
//             return res
//               .status(400)
//               .json({ notliked: 'You have not yet liked this post' });
//           }

//           // Get remove index
//           const removeIndex = post.likes
//             .map(item => item.user.toString())
//             .indexOf(req.user.id);

//           // Splice out of array
//           post.likes.splice(removeIndex, 1);

//           // Save
//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    
//   }
// );

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  (req, res) => {
    const isValid = true;

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Video.findById(req.params.id)
      .then(vid => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.body.user
        };

        // Add to comments array
        vid.comments.unshift(newComment);

        // Save
        vid.save().then(v => res.json(v));
      })
      .catch(err => res.status(404).json({ vidnotfound: 'No vid found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  (req, res) => {
    Video.findById(req.params.id)
      .then(vid => {
        // Check to see if comment exists
        if (
          vid.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = vid.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        vid.comments.splice(removeIndex, 1);

        vid.save().then(v => res.json(v));
      })
      .catch(err => res.status(404).json({ vidnotfound: 'No vid found' }));
  }
);

module.exports = router;
