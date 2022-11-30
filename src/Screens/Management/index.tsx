
import React, { useEffect, useState } from "react"
import { Wrapper, Title, Column, ColumnHeader,ProductContainer } from "./style"
import { axiosRequest } from "../../Services"
import {Input} from "../../Components/Input"
import {Button} from "../../Components/Button"
import colors from "../../Constants/colors"
interface Product{
    id: number,
    description:string,
    category:string,
    enabled:boolean
}
export const Management = ()=>{
    const [products, setProducts] = useState<Array<Product>>([])
    const [productEdit, setProductEdit]=useState<Product>({category:'ELETRODOMESTIC', enabled:true} as Product)


    useEffect(()=>{
        getProducts();

    },[])
    const saveProduct=async()=>{
        const request=await axiosRequest.post("products",productEdit);
        console.log(request.data); 
        getProducts();
    }
    const getProducts=async()=>{
        const request = await axiosRequest.get("products")
        setProducts(request.data)
    }
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
    const handleSelectbox=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        let produto={...productEdit}
        produto.category=e.currentTarget.value
        setProductEdit(produto);  
    }
    const handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let produto={...productEdit}
        if(e.target.name==='description'){
            produto.description=e.currentTarget.value
        }else{
            produto.enabled=e.currentTarget.checked
        }
        setProductEdit(produto);  
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
            <table style={{border:'1px solid white', padding:'20px', borderRadius:'10px', width:'45%'}}>
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
                            <Column >{produto.category}</Column>
                            <Column>{renderHabilitarProduto(produto)}</Column>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    const renderProdutos = () => {
        return(
            <div style={{height:'100%', display:'flex', justifyContent:'center'}}>
                <h2 style={{padding:'15px 0px', fontSize:'1.5em'}}>Cadastrar novo produto</h2>
                <Input placeholder="Nome do produto" name='description' style={{background:'white', color:'black'}} onChange={handleInput}/>
                <select style={{width:'270px', height:'40px', borderRadius:'5px', color:'black', border:'1px solid #F2643D', fontSize:'16px', padding:'3px'}}  name='category'
                onChange={handleSelectbox}>
                    <option value='ELETRODOMESTIC'>Eletrodoméstico</option>  
                    <option value='TOYS'>Brinquedos</option>
                    <option value='CLOTHES'>Roupas</option>
                    <option value='KITCHEN'>Cozinha</option>
                    <option value='BEDROOM'>Quarto</option>
                    <option value='FURNITURE'>Mobília</option>
                </select>
                <div style={{display:'flex', width:'100%', flexDirection:'row', justifyContent:'flex-start', marginTop:'10px'}}>
                    <input type='checkbox' checked={productEdit.enabled} id='editEnable' onChange={handleInput}  style={{width:'25px', height:'25px'}} />
                    <span style={{marginLeft:'10px', fontWeight:'bold', fontSize:'1.2em'}}>Habilitado</span>
                </div>
                <Button
						title="Cadastrar"
						titleColor={'colors.white'}
						color={colors.orangeDark}
						loading
						onClick={saveProduct}
					/>
            </div>
            
            
        )
    }
    return(
        <Wrapper>
            <Title>Gerenciamento da aplicação</Title>
            <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'30px'}}>
                {renderTableProdutos()}   
                <ProductContainer>
                    {renderProdutos()}  
                </ProductContainer> 
            </div> 
               
        </Wrapper>
    )
}