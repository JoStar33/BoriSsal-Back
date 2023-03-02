const Product = require("../../schemas/product/product");
const ProductReplySchema = require("../../schemas/product/productReply")

//제품에 대한 모든 댓글정보를 가지고 온다.
exports.getProductReply = async (req, res, next) => {
  try {
    const productReply = await ProductReplySchema.find({
      product_id: req.params.product_id
    });
    return res.status(200).json(productReply);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};


//상품 정보, 댓글 정보
//맨처음 댓글을 생성한 케이스.
exports.makeProductReply = async (req, res, next) => {
  try {
    const productReply = await ProductReplySchema.create({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      content: req.body.productReply.content,
      reply_child: []
    });
    return res.status(200).json(productReply);
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
exports.makeProductChildReply = async (req, res, next) => {
  try {
    await ProductReplySchema.findByIdAndUpdate(req.body.reply_id, {
      $push: {
        user_id: req.body.user_id,
        content: req.body.content,
        created_at: new Date.now
      }
    });
    return res.status(200).json("대댓글 등록 완료.");
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
exports.updateProductReply = async (req, res, next) => {
  try {
    const productReply = await ProductReplySchema.findByIdAndUpdate(req.body.reply_id, {
      content: req.body.content
    });
    return res.status(200).json(productReply);
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
exports.updateProductChildReply = async (req, res, next) => {
  try {
    await ProductReplySchema.updateOne({ _id: req.body.reply_id, "reply_child._id": req.body.child_reply_id}, {
      $set: { "reply_child.$.content": req.body.content }
    });
    return res.status(200).json("댓글 업데이트 완료.");
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
exports.deleteProductReply = async (req, res, next) => {
  try {
    await ProductReplySchema.remove({
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
exports.deleteProductChildReply = async (req, res, next) => {
  try {
    await ProductReplySchema.findByIdAndUpdate(req.body.reply_id, {
      $pull: { user_like: req.body.child_reply_id }
    });
    return res.status(200).json("대댓글 삭제 완료.");
  } catch(error) {
    console.error(error);
    return next(error);
  }
};