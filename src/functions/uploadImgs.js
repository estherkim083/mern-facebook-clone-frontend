import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/uploadImages`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearder ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err.response);
    return err.response.data.message;
  }
};
