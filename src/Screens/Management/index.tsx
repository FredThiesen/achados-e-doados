
import React, { useEffect, useState } from "react"
import { Wrapper, Title, Column, ColumnHeader, Row } from "./style"
import { axiosRequest } from "../../Services"
interface Product{
    id: number,
    description:string,
    category:string,
    enabled:boolean
}
export const Management = ()=>{
    const [products, setProducts] = useState<any>([])
    const produtos=[
        {descricao:'Camiseta', tipo:'CLOTHES', habilitado:true},
        {descricao:'Calça', tipo:'CLOTHES', habilitado:true},
        {descricao:'Meia', tipo:'CLOTHES', habilitado:false},
        {descricao:'Sapato', tipo:'CLOTHES', habilitado:true},
        {descricao:'Cueca', tipo:'CLOTHES', habilitado:true},
    ]

    useEffect(()=>{
        const axios = async ()=>{
            const request = await axiosRequest.get("products")
            setProducts(request.data)
        }
        axios()
        
        
    },[])
    const handleChangeCheckbox = async (id:number, value:boolean)=>{
        const request = await axiosRequest.put(`products/${id}?enable=${value}`,)
        let productsCopy = [...products]
        productsCopy = productsCopy.map((product:Product)=>{
            if(product.id === id){
                product.enabled = value
            }
            return product
        })
        setProducts(productsCopy)
    }

    const renderHabilitarProduto = (produto:Product) => {

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <input type='checkbox' checked={produto.enabled} id={`product_${produto.id}`} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChangeCheckbox(produto.id, e.target.checked)}  style={{width:'25px', height:'25px'}} />
        </div>
    )
    }
    const renderTableProdutos = () => {

        return(
            <table style={{border:'1px solid white', padding:'20px', borderRadius:'10px'}}>
                <thead>
                    <tr>
                        <ColumnHeader>Descrição</ColumnHeader>
                        <ColumnHeader>Tipo</ColumnHeader>
                        <ColumnHeader>Habilitado</ColumnHeader>
                    </tr>
                </thead>
                <tbody>
                    {products.map((produto:Product)=>{
                        return(
                            <tr>
                            <Column style={{width:'400px'}}>{produto.description}</Column>
                            <Column style={{width:'200px'}}>{produto.category}</Column>
                            <Column>{renderHabilitarProduto(produto)}</Column>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
  
    return(
        <Wrapper>
            <Title>Gerenciamento da aplicação</Title>
            <div style={{width:'75%', display:'flex', marginTop:'30px'}}>
                {renderTableProdutos()}    
            </div>    
        </Wrapper>
    )
}