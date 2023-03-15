const BoriGalleryReply = require("../../schemas/bori_gallery/boriGalleryReply");

//보리갤러리에 대한 모든 댓글정보를 가지고 온다.
exports.getBoriGalleryReply = async (req, res, next) => {
  try {
    const boriGalleryReply = await BoriGalleryReply.find({
      bori_gallery_id: req.params.bori_gallery_id
    });
    return res.status(200).json(boriGalleryReply);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};


//맨처음 댓글을 생성한 케이스.
exports.makeBoriGalleryReply = async (req, res, next) => {
  try {
    const boriGalleryReply = await BoriGalleryReply.create({
      user_id: req.body.user_id,
      bori_gallery_id: req.body.bori_gallery_id,
      content: req.body.content,
      reply_child: []
    });
    return res.status(200).json(boriGalleryReply);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};


/*
  {
    reply_id: ~~~,
    user_id: ~~~,
    content: ~~~
  }
*/
exports.makeBoriGalleryChildReply = async (req, res, next) => {
  try {
    await BoriGalleryReply.findByIdAndUpdate(req.body.reply_id, {
      $push: {
        user_id: req.body.user_id,
        content: req.body.content,
        created_at: new Date.now
      }
    });
    return res.status(200).json({message: "대댓글 등록 완료."});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//댓글은 내용만 수정하므로 content값만 가지고 온다.
/*
  {
    reply_id: ~~~,
    content: ~~~
  }
*/
exports.updateBoriGalleryReply = async (req, res, next) => {
  try {
    const boriGalleryReply = await BoriGalleryReply.findByIdAndUpdate(req.body.reply_id, {
      content: req.body.content
    });
    return res.status(200).json(boriGalleryReply);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//부모 댓글 아이디 정보와 자식 댓글 아이디정보를 가지고 온다.
/*
  {
    reply_id: ~~~,
    child_reply_id: ~~~,
    content: ~~~
  }
*/
exports.updateBoriGalleryChildReply = async (req, res, next) => {
  try {
    await BoriGalleryReply.updateOne({ _id: req.body.reply_id, "reply_child._id": req.body.child_reply_id}, {
      $set: { "reply_child.$.content": req.body.content }
    });
    return res.status(200).json({message: "댓글 업데이트 완료."});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

/*
  {
    reply_id: ~~~
  }
*/
exports.deleteBoriGalleryReply = async (req, res, next) => {
  try {
    await BoriGalleryReply.remove({
      _id: req.body.reply_id
    });
    return res.status(200).json({message: "댓글 삭제 완료."});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

/*
  {
    reply_id: ~~~,
    child_reply_id: ~~~
  }
*/
exports.deleteBoriGalleryChildReply = async (req, res, next) => {
  try {
    await BoriGalleryReply.findByIdAndUpdate(req.body.reply_id, {
      $pull: { user_like: req.body.child_reply_id }
    });
    return res.status(200).json({message: "대댓글 삭제 완료."});
  } catch(error) {
    console.error(error);
    return next(error);
  }
};