import axios from 'axios';

export const uploadFile = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'images_preset');

  try {
    let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const uploadMultipleFiles = async (files) => {
  const uploadPromises = files.map((file) => uploadFile(file));

  const urls = await Promise.all(uploadPromises);
  return urls;
};
