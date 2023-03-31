const BoriGoods = require("../../schemas/bori_goods/boriGoods");
const User = require("../../schemas/user/user");
const fs = require('fs');

exports.getBoriGoods = async (req, res, next) => {
  try {
    const boriGoods = await BoriGoods.find(); 
    return res.status(200).json(boriGoods);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.getBoriGoodsById = async (req, res, next) => {
  try {
    const boriGoods = await BoriGoods.findById(
      req.params.bori_goods_id
    ); 
    return res.status(200).json(boriGoods);
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateBoriGoodsImage = async (req, res, next) => {
  try {
    const boriGoods = await BoriGoods.findById(req.params.bori_goods_id);
    fs.unlink(`./bori_goods_images/${boriGoods.bori_goods_image}`,(error)=>{
      console.error(error);
      return next(error);
    });
    await BoriGoods.findByIdAndUpdate(req.params.bori_goods_id, {
      profile_image: `/bori_goods_images/${req.file.filename}`,
    });
    res.status(200).json({bori_goods_image: `/bori_goods_images/${req.file.filename}`});
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.updateBoriGoods = async (req, res, next) => {
  const { bori_goods, category_id } = req.body;
  try {
    await BoriGoods.findByIdAndUpdate(req.params.bori_goods_id, {
      category_id: category_id,
      bori_goods_name: bori_goods.bori_goods_name,
      bori_goods_price: bori_goods.bori_goods_price,
      bori_goods_stock: bori_goods.bori_goods_stock,
      bori_goods_desc: bori_goods.bori_goods_desc,
    });
    res.status(200).json({ message: "업데이트 성공" });
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

exports.makeBoriGoods = async (req, res, next) => {
  const {category_id, bori_goods} = JSON.parse(req.body.bori_goods);
  try {
    const exBoriGoods = await BoriGoods.find({
      bori_goods_name: bori_goods.bori_goods_name
    });
    if(!exBoriGoods) {
      return res.status(400).json({message: "이미 존재하는 상품입니다. 다시 등록해주세요."});
    };
    const newBoriGoods = await BoriGoods.create(
      {
        category_id: category_id,
        bori_goods_name: bori_goods.bori_goods_name,
        bori_goods_price: bori_goods.bori_goods_price,
        bori_goods_stock: bori_goods.bori_goods_stock,
        bori_goods_desc: bori_goods.bori_goods_desc,
        bori_goods_image: `/bori_goods_images/${req.file.filename}`,
      }
    );
    return res.status(200).json({
      message: "제품등록이 완료됐습니다.",
      newBoriGoods
    });
  } catch(error) {
    console.error(error);
    return next(error);
  };
};

//좋아요를 사용자가 눌렀을 경우.
/*
{
  bori_goods_id: ~~~,
}
*/
exports.likeBoriGoods = async (req, res, next) => {
  const {bori_goods_id} = req.body;
  try {
    await BoriGoods.findByIdAndUpdate(
      bori_goods_id, {
        $inc: {
          bori_goods_like: 1
        }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.session.passport.user, {
        $push: { user_bori_goods_like: bori_goods_id }
      }
    );
    res.status(200).json({
      user_bori_goods_like: user.user_bori_goods_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.deleteBoriGoods = async (req, res, next) => {
  try {
    const boriGoods = await BoriGoods.findById(req.params.bori_goods_id);
    fs.unlink(`./${boriGoods.bori_goods_image}`,(error)=>{
      console.error(error);
    })
    await BoriGoods.remove({
      _id: req.params.bori_goods_id
    });
    return res.status(200).json("댓글 삭제 완료.");
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

exports.dislikeBoriGoods = async (req, res, next) => {
  const {bori_goods_id} = req.body;
  try {
    await BoriGoods.findByIdAndUpdate(
      bori_goods_id, {
        $inc: {
          bori_goods_like: -1
        }
      }
    );
    const user = await User.findByIdAndUpdate(
      req.session.passport.user, {
        $pull: { user_bori_goods_like: bori_goods_id }
      }
    );
    res.status(200).json({
      user_bori_goods_like: user.user_bori_goods_like
    });
  } catch(error) {
    console.error(error);
    return next(error);
  }
};