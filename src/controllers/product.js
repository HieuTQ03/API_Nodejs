// import axios from "axios";
import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string(),
  description: Joi.string().required(),
  categoryId: Joi.string().required().messages({
    "any.required": "Danh mục sản phẩm là bắt buộc"
  })
});
//products?_sort=price&_order=desc&_limit=4    ||  products?_page2&_limit=4
export const getAll = async (req, res) => {
  const {
    _limit = 20,
    _sort = "creatAt",
    _order = "asc",
    _page = 1
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1
    }
  };
  try {
    // const {data}=await axios.get("http://localhost:3000/products");
    const product = await Product.paginate({}, options);

    if (product.length == 0) {
      return res.status(200).json({
        message: "Không có sản phẩm nào"
      });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    // const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    const product = await Product.findById(id)
      .populate("categoryId")
      .select("-__v");
    if (!product) {
      return res.status(200).json({
        message: "Sản phẩm không tồn tại"
      });
    }
    return res.status(200).json({
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body);
    if (error) {
      return res.json({
        message: error.details[0].message
      });
    }

    // const { data } = await axios.post(`http://localhost:3000/products`, body);
    const product = await Product.create(body);
    if (product.length == 0) {
      return res.status(200).json({
        message: "Thêm sản phẩm thất bại"
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id
      }
    });
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    // await axios.delete(`http://localhost:3000/products/${req.params.id}`);
    const product = await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    // const { data } = await axios.patch(`http://localhost:3000/products/${req.params.id}`, req.body);
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm thất bại"
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      product
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
