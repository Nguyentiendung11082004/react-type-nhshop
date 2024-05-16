import { ICategory } from "./category"
export interface IProduct {
    id?: number | string
    name: string
    price: number
    image: string
    imageArray: string[]
    description: string
    discount: number
    quantity: number
    featured: boolean
    categoryId: number
    color: string
    category: ICategory
}
