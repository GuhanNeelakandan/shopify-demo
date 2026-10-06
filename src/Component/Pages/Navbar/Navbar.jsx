import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
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
  return (
   <div className='container-fluid bg-body-tertiary'>
        <div className='container'>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Yosuva</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Login</a>
        </li>
        <Link to={'/cart'}>
        <li class="nav-item">
          <a class="nav-link" href="#" style={{width:'80px'}}>Cart <sup>{cartList?.length}</sup></a>
        </li>
        </Link>
        
      </ul>
    </div>
</nav>
        </div>
   </div>
  )
}

export default Navbar