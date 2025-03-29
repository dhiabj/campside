const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .populate('userId')
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:userId').get((req, res) => {
  //console.log(req.params);
  Post.find({ userId: req.params.userId })
    .populate('userId')
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const availableNetwork = req.body.availableNetwork;
    const userId = req.body.userId;
    const img = req.body.gallery;

    const newPost = await Post.create({
      title,
      description,
      availableNetwork,
      img,
      userId,
    });

    console.log(newPost);

    const populated = await newPost.populate('userId');

    // const populated = await Post.populate(newPost, { path: "userId" });

    //console.log(populated);

    res.status(200).json(populated);
  } catch (error) {
    res.status(400).json('Error:' + error);
  }
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.title = req.body.title;
      post.description = req.body.description;
      post.availableNetwork = req.body.availableNetwork;

      post
        .save()
        .then(() => res.json('Post updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
