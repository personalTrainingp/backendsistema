const { v4 } = require("uuid");
const ipFileServer = require("../../config/constant");
const { db } = require("../../database/sequelizeConnection");
const { ImagePT } = require("../../models/Image");
const { request, response } = require("express");
const { ProgramaTraining } = require("../../models/ProgramaTraining");
const uid = require("uuid");
const { uploadFile, downloadFile } = require("../../config/blobstorage");

const uploadPost_AVATAR = async (req, res) => {
  const containerName = "useravatar"; // Reemplaza con tu contenedor
  const blobName = req.file.originalname;
  const filePath = req.file.path;

  try {
    await uploadFile(containerName, blobName, filePath);
    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
};
const obtenerUpload_AVATAR = async (req, res) => {
  const containerName = "useravatar"; // Reemplaza con tu contenedor
  const blobName = req.params.filename;
  const downloadFilePath = `downloads/${blobName}`;

  try {
    await downloadFile(containerName, blobName, downloadFilePath);
    res.download(downloadFilePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading file.");
  }
};
const obtener_nutricion_DIETAS = async(req, res)=>{
  const containerName = "nutricion-dietas"; // Reemplaza con tu contenedor
  const blobName = req.params.filename;
  const downloadFilePath = `downloads/${blobName}`;

  try {
    await downloadFile(containerName, blobName, downloadFilePath);
    res.download(downloadFilePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error downloading file.");
  }
}
const uploadPost_nutricion_DIETAS = async (req, res) => {
  const containerName = "nutricion-dietas"; // Reemplaza con tu contenedor
  const blobName = req.file.originalname;
  const filePath = req.file.path;
  try {
    await uploadFile(containerName, blobName, filePath);
    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
};

const upload = async (req, res) => {
  const { file } = req;
  try {
    return res.status(200).json({
      msg: "archivo cargado",
      url: `${ipFileServer}${file?.filename}`,
      name: file?.filename,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error al cargar el archivo",
      error: error,
    });
  }
};

/*
{
  fieldname: 'logo',
  originalname: 'WhatsApp Image 2024-01-28 at 3.26.51 PM.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'C:\\Users\\Carlos Rosales\\Documents\\TODO DE PT\\proyecto pt\\dashboardPT\\dashboard-backend\\uploads\\logo',
  filename: 'WhatsApp Image 2024-01-28 at 3.26.51 PM-1709604424383.png',
  path: 'C:\\Users\\Carlos Rosales\\Documents\\TODO DE PT\\proyecto pt\\dashboardPT\\dashboard-backend\\uploads\\logo\\WhatsApp Image 2024-01-28 at 3.26.51 PM-1709604424383.png',
  size: 491868
}
*/
const uploadLogo = async (req, res) => {
  const saveImage = async (req, res) => {
    try {
      const { file } = req;
      const { uidLocation } = req.params;
      if (!file) return;
      const uuid = v4();
      // const images = await ImagePT.findAll({ where: { uuid_image: uuid } });
      // if (images.length > 0) {
      //   saveImage();
      // }
      const img = new ImagePT({
        uid_location: uidLocation,
        name_image: file.filename,
        extension_image: file.mimetype,
        clasificacion_image: "PROGRAMA TRAINING",
        size_image: file.size,
        uid: uuid,
      });
      await img.save();
      return res.status(200).json({
        uuid_image: img.uuid_image,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error en el servidor",
        error: error,
      });
    }
  };
  saveImage(req, res);
};
const uploadDieta = async (req, res) => {
  const saveFile = async (req, res) => {
    try {
      const { file } = req;
      const { uidLocation } = req.params;
      if (!file) return;
      const img = new ImagePT({
        uid_location: uidLocation,
        name_image: file.filename,
        extension_image: file.mimetype,
        clasificacion_image: "FILE-DIETA",
        size_image: file.size,
        uid: uid.v4(),
      });
      await img.save();
      return res.status(200).json({
        uuid_image: img.uuid_image,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error en el servidor",
        error: error,
      });
    }
  };
  saveFile(req, res);
};
const uploadUpdate = async (req = request, res = response) => {
  const { uid } = req.params;
  const { file } = req;
  try {
    const Image = await ImagePT.findOne({ where: { uuid_image: uid } });
    if (!Image) {
      return res.status(404).json({
        msg: `No existe una imagen con ese uid "${uid}"`,
      });
    }
    await Image.update({
      name_image: file.filename,
      extension_image: file.mimetype,
      // clasificacion_image: "PROGRAMA TRAINING",
      size_image: file.size,
    });
    res.status(200).json(Image);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor(putUpload), hable con el administrador: ${error}`,
    });
  }
};

const uploadAvatar = async (req, res) => {
  const saveImage = async (req, res) => {
    try {
      const { file } = req;
      const { uidLocation } = req.params;
      if (!file) return;
      const img = new ImagePT({
        uid_location: uidLocation,
        name_image: file.filename,
        extension_image: file.mimetype,
        clasificacion_image: "AVATAR",
        size_image: file.size,
        uid: uid.v4(),
      });
      await img.save();
      return res.status(200).json({
        uuid_image: img.uuid_image,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error en el servidor",
        error: error,
      });
    }
  };
  saveImage(req, res);
};

const uploadTarjeta = async (req, res) => {
  const saveImage = async (req, res) => {
    try {
      const { file } = req;
      const { uidLocation } = req.params;
      if (!file) return;
      const img = new ImagePT({
        uid_location: uidLocation,
        name_image: file.filename,
        extension_image: file.mimetype,
        clasificacion_image: "TARJETA",
        size_image: file.size,
        uid: uid.v4(),
      });
      await img.save();
      return res.status(200).json({
        uuid_image: img.uuid_image,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error en el servidor",
        error: error,
      });
    }
  };
  saveImage(req, res);
};
const getUpload = async (req, res) => {
  try {
    const { uidLocation } = req.params;
    const img = await ImagePT.findOne({ where: { uid_location: uidLocation } });
    // console.log(img, uidLocation);
    res.status(200).json(img);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor(getUpload), hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  upload,
  uploadLogo,
  uploadUpdate,
  uploadAvatar,
  uploadDieta,
  getUpload,
  uploadTarjeta,
  uploadPost_nutricion_DIETAS,
  obtener_nutricion_DIETAS,

  uploadPost_AVATAR,
  obtenerUpload_AVATAR,
};
