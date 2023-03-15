const BoriGallery = require("../../schemas/bori_gallery/boriGallery");
const User = require("../../schemas/user/user");

exports.getBoriGallery = async (req, res, next) => {
  try {
    const boriGallery = await BoriGallery.find({});
    return res.status(200).json(boriGallery);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getBoriGalleryById = async (req, res, next) => {
  try {
    const boriGallery = await BoriGallery.findById(
      req.params.bori_gallery_id
    );
    return res.status(200).json(boriGallery);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeBoriGallery = async (req, res, next) => {
  const { bori_gallery } = req.body;
  try {
    const boriGallery = await BoriGallery.create({
      user_id: req.body.user_id,
      bori_gallery_title: bori_gallery.bori_gallery_title,
      bori_gallery_desc: bori_gallery.bori_gallery_desc,
      bori_gallery_image: `/img/${req.file.filename}`
    });
    return res.status(200).json(boriGallery);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateBoriGallery = async (req, res, next) => {
  const { bori_gallery } = req.body;
  try {  
    const boriGallery = await BoriGallery.findByIdAndUpdate(bori_gallery.bori_gallery_id, {
      bori_gallery_title: bori_gallery.bori_gallery_title,
      bori_gallery_desc: bori_gallery.bori_gallery_desc
    });
    return res.status(200).json(boriGallery);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateBoriGalleryImage = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.bori_gallery_id, {
      profile_image: `/img/${req.file.filename}`,
    });
    res.status.json(`/img/${req.file.filename}`);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.deleteBoriGallery = async (req, res, next) => {
  try {  
    await BoriGallery.remove({_id: req.body.bori_gallery_id});
    return res.status(200).json({message: "정상적으로 삭제했습니다!"});
  } catch(error) {
    console.error(error);
    return next(error);
  };
}

exports.likeBoriGallery = async (req, res, next) => {
  try {
    await BoriGallery.findByIdAndUpdate(
      req.body.bori_gallery_id, {
        bori_gallery_like: { $inc: 1 }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.body.user_id, {
        $push: { user_bori_gallery_like: req.body.bori_gallery_id }
      }
    );
    res.status(200).json({
      user_bori_gallery_like: user.user_bori_gallery_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.dislikeBoriGallery = async (req, res, next) => {
  try {
    await BoriGallery.findByIdAndUpdate(
      req.body.bori_gallery_id, {
        bori_gallery_like: { $inc: -1 }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.body.user_id, {
        $pull: { user_bori_gallery_like: req.body.bori_gallery_id }
      }
    );
    res.status(200).json({
      user_bori_gallery_like: user.user_bori_gallery_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};