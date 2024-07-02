import axios from "axios";

const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image',image)

    //according to imgbb api using documentation
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,formData)

    return data;
};

export default imageUpload;