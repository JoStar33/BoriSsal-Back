const BoriGoodsReply = require("../../schemas/bori_goods/boriGoodsReply")

//제품에 대한 모든 댓글정보를 가지고 온다.
exports.getBoriGoodsReply = async (req, res, next) => {
  try {
    let overflow = false
    const boriGoodsReply = await BoriGoodsReply.find({
      bori_goods_id: req.params.bori_goods_id
    }).limit(parseInt(req.params.limit) * 10).sort({_id: -1});
    if (parseInt(req.params.limit) * 10 > boriGoodsReply.length) {
      overflow = true
    }
    return res.status(200).json({bori_goods_reply: boriGoodsReply, overflow: overflow});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};


//상품 정보, 댓글 정보
//맨처음 댓글을 생성한 케이스.
exports.makeBoriGoodsReply = async (req, res, next) => {
  try {
    const boriGoodsReply = await BoriGoodsReply.create({
      user_id: req.session.passport.user,
      email: req.body.email,
      bori_goods_id: req.body.bori_goods_id,
      content: req.body.content,
      reply_child: []
    });
    return res.status(200).json(boriGoodsReply);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};


/*
  {
    reply_id: ~~~,
    content: ~~~
  }
*/
exports.makeBoriGoodsChildReply = async (req, res, next) => {
  try {
    await BoriGoodsReply.findByIdAndUpdate(req.body.reply_id, {
      $push: {
        reply_child: {
          user_id: req.session.passport.user,
          email: req.body.email,
          content: req.body.content,
          created_at: new Date()
        }
      }
    });
    return res.status(200).json({
      message: "대댓글 등록 완료."
    });
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
exports.updateBoriGoodsReply = async (req, res, next) => {
  try {
    const boriGoodsReply = await BoriGoodsReply.findByIdAndUpdate(req.body.reply_id, {
      content: req.body.content
    });
    return res.status(200).json(boriGoodsReply);
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
exports.updateBoriGoodsChildReply = async (req, res, next) => {
  try {
    await BoriGoodsReply.updateOne({ _id: req.body.reply_id, "reply_child._id": req.body.child_reply_id}, {
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
exports.deleteBoriGoodsReply = async (req, res, next) => {
  try {
    await BoriGoodsReply.remove({
      _id: req.body.reply_id
    });
    return res.status(200).json("댓글 삭제 완료.");
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
exports.deleteBoriGoodsChildReply = async (req, res, next) => {
  try {
    await BoriGoodsReply.findByIdAndUpdate(req.body.reply_id, {
      $pull: { user_like: req.body.child_reply_id }
    });
    return res.status(200).json({
      message: "대댓글 삭제 완료."
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};