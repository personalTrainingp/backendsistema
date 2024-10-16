const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
require("dotenv").config();

const blobService = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
// const blobServiceClient = new BlobServiceClient(
//   `https://${account}.blob.core.windows.net`,
//   new StorageSharedKeyCredential(account, accountKey)
// );

// async function uploadFile(containerName, blobName, filePath) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.uploadFile(filePath);
// }

// async function downloadFile(containerName, blobName, downloadFilePath) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.downloadToFile(downloadFilePath);
// }

module.exports = {
  // uploadFile,
  // downloadFile,
  blobService,
};
