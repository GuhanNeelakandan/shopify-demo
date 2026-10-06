import axios from 'axios'
import { truncate } from 'lodash'
import React, { useEffect, useState } from 'react'

function Cart() {
    const [cartList,setCartList]= useState([])
    const getCartList = ()=>{
        axios.get('https://67f7be0b2466325443ea7f82.mockapi.io/student/cart').then((res)=>{
            if(res.status===200){
                setCartList(res.data)
            }else{
                setCartList([])
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getCartList()
    },[])

    const totalPrice = cartList?.reduce((prev,curr)=>{
        let discountCost = 0
        let originalCost = curr?.price
        let discountPercentage = curr?.discountPercentage

        discountCost = originalCost - (discountPercentage * originalCost) / 100
        
        return (prev+discountCost ) * (curr.qty)
    },0)

    console.log(totalPrice)


    const removeCart =(cartId)=>{
        if(cartId!==""&&cartId!==undefined){
            axios.delete(`https://67f7be0b2466325443ea7f82.mockapi.io/student/cart/${cartId}`).then((res)=>{
                alert("Product Removed")
                getCartList()
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            return alert("CartId required")
        }
        
    }

    const incrementQty = (list)=>{
        list.qty = parseInt(list.qty)+1
        axios.put(`https://67f7be0b2466325443ea7f82.mockapi.io/student/cart/${list.id}`,list).then((res)=>{
            alert("Quantity updated")
            getCartList()
        }).catch((err)=>{
            console.log(err)
        })

    }


  return (
    <div className='container w-75 mx-auto my-5'>
          <div className='cart-box'>
            {
                cartList.map((list)=>{
                    let discountCost = 0
                    let originalCost = list?.price
                    let discountPercentage = list?.discountPercentage

                    discountCost = originalCost - (discountPercentage * originalCost) / 100
                    return <div class="card w-75 mb-3">
                    <div class="card-body">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h5 class="card-title">{list?.brand}</h5>
                                    <p class="card-text" title={list?.description} dangerouslySetInnerHTML={{ __html: truncate(list?.description, { length: 24 }) }}></p>
                                    <div>
                                        <span className='text-success px-3'>${discountCost?.toFixed(2)}</span><span className='text-muted px-3'><del>${list?.price}</del></span><span><b>{list?.discountPercentage}%</b></span>
                                    </div>
                                    <div>
                                        <button>-</button>
                                        {list?.qty}
                                        <button onClick={()=>incrementQty(list)}>+</button>
                                    </div>
                                    <div>
                                        <button onClick={()=>removeCart(list?.id)}>Remove</button>
                                    </div>
                                </div>
                                <div>
                                    <img src={list?.images[0]} class="card-img-top" width={100} height={200} />
                                </div>
                            </div>
                    </div>
                </div>
                })
            }
              
        </div>
        <div>
             <div className='d-flex justify-content-between'>
                    <div>
                        Total Cost harsha
                    </div>
                    <div>
                        ${totalPrice?.toFixed(2)}
                    </div>
             </div>
        </div>
    </div>
  )
} 

export default Cart