import React, { useEffect, useState } from 'react'
import demoImg from './../../../Images/products/product.jpeg'
import axios from 'axios'
import { truncate } from 'lodash'
import { useNavigate } from 'react-router-dom'

function Products() {
    const navigate = useNavigate()
    const [productList,setProductList] =useState([])//undefined

    const getProductList =()=>{
        axios.get('https://dummyjson.com/products').then((res)=>{
            if(res.status===200){
                setProductList(res?.data?.products)//undefined
            }else{
                setProductList([])
            }
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getProductList()
    },[])

    console.log(productList)

    const addToCart = (product)=>{
        axios.post('https://67f7be0b2466325443ea7f82.mockapi.io/student/cart',product).then((res)=>{
            alert("Added to Cart")
            navigate('/cart')
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='container'>
            <h2>Products siva <small className='text-muted'>{productList.length} items</small></h2>
            <div className='conatiner'>
                    <div className='row'>
                        {
                           productList.length>0 && productList?.map((product)=>{
                                let discountCost = 0
                                let originalCost = product?.price
                                let discountPercentage = product?.discountPercentage

                                discountCost = originalCost - (discountPercentage*originalCost)/100
                                return  <div className='col-3'>
                                <div>
                                    <div class="card" style={{ width: "18rem" }}>
                                        <img src={product?.images[0]} class="card-img-top" width={100} height={200} alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{product?.brand}</h5>
                                            <p class="card-text" title={product?.description} dangerouslySetInnerHTML={{__html:truncate(product?.description,{length:24})}}></p>
                                            <div>
                                                <span className='text-success px-3'>${discountCost?.toFixed(2)}</span><span className='text-muted px-3'><del>${product?.price}</del></span><span><b>{product?.discountPercentage}%</b></span>
                                            </div>
                                            <a href="#" class="btn btn-primary" onClick={()=>addToCart(product)}>Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            })
                        }
                 
              </div>
            </div>
    </div>
  )
}

export default Products