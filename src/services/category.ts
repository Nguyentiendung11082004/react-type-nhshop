import instance from "../config/axios"

export const getAllCategory = async () => {
    try {
        const response = await instance.get("/categories");
        return response.data;   
    } catch (error) {
        // return [];
        console.log("error", error)
    }
}
export const getCategoryById = async (id:number) => {
     try {
        const response = await instance.get(`/categories/${id}`);
        return response.data;
     } catch (error) {
        console.log("error", error)
        
     }
}