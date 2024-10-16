const { request, response } = require("express");
const { Comision } = require("../models/Comision");

const postComision = async (req = request, res = response) => {
  try {
    const comision = new Comision(req.body);
    await comision.save();
    res.status(200).json({
      comision,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  postComision,
};
