import { IProduct } from "../commons/interfaces/product";
import instance from "../config/axios";


export const getAllProduct = async (): Promise<IProduct[]> => {
    try {
        const reponse = await instance.get("/products?_expand=category");
        return reponse.data;
    } catch (error) {
        return [];
    }
}
export const getProductById = async (id:number | string) => {
    try {
        const reponse = await instance.get(`/products/${id}?_expand=category`);
        return reponse.data;
    } catch (error) {
        return [];
    }
}
export const getProductsByCategoryId = async (categoryId:any) => {
    try {
      const response = await instance.get(`/products?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
    console.log(error)
    }
  };
//   export const createProduct = async (product:Iproduct) => {
//     try {
//         const reponse = await instance.post(`/products`, product);
//         return reponse.data;
//     } catch (error) {
//         return [];
//     }
// }
//     export const updateProduct = async (product:Iproduct) => {
//         try {
//             const reponse = await instance.put(`/products/${product?.id}`, product);
//             return reponse.data;
//         } catch (error) {
//             return [];
//         }
// }
// export const deleteProduct = async (id:any) => {
//     try {
//         const reponse = await instance.put(`/products/${id}`);
//         return reponse.data;
//     } catch (error) {
//         return [];
//     }
// }