export type Category='New'|'Dresses'|'Hijab'|'Instant Hijab'|'Prayer Hijab'|'Kid Hijab'|'Apparel'|'Accessories';
export interface ProductVariant {id:string;name:string;color:string;hex:string;stock:number}
export interface Product {id:string;slug:string;name:string;category:Category;price:number;originalPrice?:number;rating:number;reviews:number;image:string;gallery:string[];description:string;isNew?:boolean;featured?:boolean;variants:ProductVariant[]}
