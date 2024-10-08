const multer = require('multer');
const posts = require('../model/postmodel');
const path = require('path');

const createPost = async (req, res, next) => {
  let id = req.params.id;

  await posts
    .create({
      title: req.body.title,
      desc: req.body.desc,
      shortDesc: req.body.shortDesc,
      // likes : req.body.likes,
      image: req.body.image,
      userId: id,
      catagory: req.body.catagory,
      userName: req.body.userName,
      userImage: req.body.userImage,
    })
    .then((result) => {
      res.json('Post is Created');
      next();
    })
    .catch((err) => {
      res.status(404).json('Fiail to create post');
    });
};

const getUserPost = async (req, res, next) => {
  let id = req.params.id;
  await posts
    .find({ userId: id })
    .then((result) => {
      res.json({ Data: result });
    })
    .catch((err) => {
      res.json({ err });
    });
};

const DeletePost = async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  await posts
    .findByIdAndDelete(id)
    .then((result) => {
      res.json({ message: 'Post is Deleted' }).status(200);
    })
    .catch((err) => {
      res.json(err).status(404);
    });
};

const UpdatePost = async (req, res, next) => {
  let id = req.body.pid;
  await posts
    .findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        desc: req.body.desc,
        shortDesc: req.body.shortDesc,
        likes: req.body.likes,
        image: req.body.image,
        catagory: req.body.category,
      }
    )
    .then((result) => {
      res.status(200).json({ message: 'Post is Updated' });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

//Get perticular post
const getPost = async (req, res, next) => {
  let id = req.params.id;
  await posts
    .findById({ _id: id })
    .then((result) => {
      res.json({ message: 'Post data is recieved', data: result });
    })
    .catch((err) => {
      res.json(err);
    });
};

//Get All post
// const getAllPost = async (res,req,next) =>{
//     await posts.find({})
//     .then(result => {res.json({message:"All post are recieved",data:result})})
//     .catch(err => {res.json(err)});
// }

const getAllPost = async (req, res, next) => {
  await posts
    .find({})
    .then((result) => {
      res.json({ message: 'All Post are recieved', data: result });
    })
    .catch((err) => {
      res.json(err);
    });
};

//add Likes
const AddLikes = async (req, res, next) => {
  let uid = req.body.id;
  let PostId = req.body.pid;
  const p = await posts.findById(PostId);
  if (p.likes.includes(uid)) {
    await posts
      .findByIdAndUpdate(
        { _id: PostId },
        { $pull: { likes: uid } },
        { new: true }
      )
      .then((result) => {
        res.json({ message: 'Post DisLiked', data: result });
      })
      .catch((err) => res.json(err));
  } else {
    await posts
      .findByIdAndUpdate(
        { _id: PostId },
        { $push: { likes: uid } },
        { new: true }
      )
      .then((result) => {
        res.json({ message: 'Post Liked', data: result });
      })
      .catch((err) => res.json(err));
  }
};

const SearchPost = async (req, res) => {
  try {
    const query = req.query.search;
    // const searchResult = await posts.find({ $text : { $search : query} });
    const searchResult = await posts.find({
      $or: [
        { title: { $regex: new RegExp(query, 'i') } },
        { shortDesc: { $regex: new RegExp(query, 'i') } },
      ],
    });
    res.status(200).json(searchResult);
  } catch (error) {
    console.log('Error Searching post : ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Upload img
const imgpath = path.join(__dirname, '../../Images/postImg');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgpath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
const uploadmiddleware = upload.single('postimg');
const UploadPostCoverImage = async (req, res) => {
  try {
    console.log('Api Called');
    await new Promise((resolve, reject) => {
      uploadmiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          reject({ status: 400, message: err });
        } else if (err) {
          reject({ status: 500, message: 'File Upload Fail !!' });
        } else {
          resolve();
        }
      });
    });
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imgName = req.file.filename;
    const id = req.params.pid;

    const post = await posts.findById({ _id: id });
    if (post) {
      const updatedPost = await posts.findByIdAndUpdate(
        { _id: id },
        { image: imgName },
        { new: true }
      );

      res.status(200).json({
        message: 'Cover Image Uploaded successfully',
        data: updatedPost,
      });
    } else {
      return res.status(400).json({ message: 'No Post Found' });
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    }
    console.log(err);

    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
};

module.exports = {
  createPost,
  getUserPost,
  DeletePost,
  UpdatePost,
  getPost,
  getAllPost,
  AddLikes,
  SearchPost,
  UploadPostCoverImage,
};
