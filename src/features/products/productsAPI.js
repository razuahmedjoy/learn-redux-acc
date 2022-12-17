import axiosInstance from "../../utils/axios.config";

export const fetchProducts = async () => {
    const data = await axiosInstance.get("/products");
    // console.log(data);
    return data.data.data;
}

export const postProduct = async (productData)=>{

   const res =  await axiosInstance.post("/product",productData);
    console.log(res);
}

export const deleteProduct = async (id)=>{
    const res =  await axiosInstance.delete(`/product/${id}`);
    console.log(res);
}