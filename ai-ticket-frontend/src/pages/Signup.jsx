import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [form,setForm]=useState({email:"",password:""})
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    
  return (
    <div>
      signup
    </div>
  )
}

export default Signup
