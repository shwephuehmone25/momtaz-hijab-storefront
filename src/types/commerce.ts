import type { Product } from '@/features/products/types/product';
export interface CartItem {product:Product;quantity:number;variantId:string}
export interface Address {firstName:string;lastName:string;email:string;phone?:string;address:string;city:string;postalCode:string;country:string}
export interface Customer {id:string;name:string;email:string}
export interface Order {id:string;items:CartItem[];total:number;status:'mock-confirmed';createdAt:string}
