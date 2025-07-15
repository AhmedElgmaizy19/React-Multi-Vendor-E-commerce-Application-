import React from 'react'
import { Link } from 'react-router-dom'
import userAuthStore from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import Products from './store/Products'

function Home() {
  const isLoggedIn = userAuthStore((state)=>state.IsLoggedIn())
  const navigate = useNavigate()
 
  return (
    <Products/>
  )
}

export default Home