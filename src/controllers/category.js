import Category from "../models/category";
import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required()
});

export const getAll = async (req, res) => {
  try {
    const data = await Category.find().populate("products");

    if (data.length == 0) {
      return res.status(200).json({
        message: "Không có sản phẩm nào"
      });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id)
      .populate("products")
      .select("-__v");

    if (!category) {
      return res.status(200).json({
        message: "Không tồn tại danh mục này"
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;

    const { error } = categorySchema.validate(body);
    if (error) {
      return res.json({
        message: error.details.map(item => item.message)
      });
    }

    const data = await Category.create(body);
    if (data.length == 0) {
      return res.status(200).json({
        message: "Thêm danh mục thất bại"
      });
    }
    return res.status(200).json({
      message: "Thêm danh mục thành công",
      data
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Xóa danh mụcthành công",
      data
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      return res.status(200).json({
        message: "Cập nhật danh mục thất bại"
      });
    }
    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
      data
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
