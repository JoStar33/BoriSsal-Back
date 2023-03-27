const BoriGoods = require("../../schemas/bori_goods/boriGoods");
const User = require("../../schemas/user/user");

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

exports.makeBoriGoods = async (req, res, next) => {
  const {category_id, boriGoods} = req.body
  try {
    const exBoriGoods = await BoriGoods.find({
      bori_goods_name: boriGoods.bori_goods_name
    });
    if(exBoriGoods.length >= 1) {
      return res.status(400).json({message: "이미 존재하는 상품입니다. 다시 등록해주세요."});
    };
    const newBoriGoods = await BoriGoods.create(
      {
        category_id: category_id,
        bori_goods_name: boriGoods.bori_goods_name,
        bori_goods_price: boriGoods.bori_goods_price,
        bori_goods_stock: boriGoods.bori_goods_stock,
        bori_goods_desc: boriGoods.bori_goods_desc,
        bori_goods_image: `/bori_goods_images/${req.file.filename}`,
      }
    );
    console.log(newBoriGoods._id);
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
    console.log(req.body);
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