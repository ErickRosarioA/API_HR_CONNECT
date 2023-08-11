const { response, request } = require("express");
const { generarJWT } = require("./generarJWT");
const { v4: uuidv4 } = require('uuid');

const getToken = async (req, res = response) => {

  try {
    const uid = uuidv4();
    const token = await generarJWT(uid);

    res.json({
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = getToken;
