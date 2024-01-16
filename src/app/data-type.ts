export interface SignUp{
    name : string , 
    password : string,
    email:string,
}

export interface login{
    email : string,
    password : string
}

export interface addproductDataType{
    category: number,
    color: string,
    description: string,
    image: string,
    name: string,
    price: number,
    id:number,
    quantity:undefined | number,
   

}

export interface cart{
    category: number,
    color: string,
    description: string,
    image: string,
    name: string,
    price: number,
    id:number | undefined,
    quantity:undefined | number,
    userID : number,
    productID : number
   

}

export interface userAuthDataType{
    name : string,
    email : string,
    password : string
}

export interface userLoginDataType{
   
    email : string,
    password : string
}
