import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillWechat } from "react-icons/ai";

function Navigation() {
  return (
    <div className='flex justify-between items-center shadow-md px-5 py-2'>
        <Link to='/' className='font-bold'>
        <AiFillWechat color='#000' size={45} className='' />
        </Link>
        <div className='w-4/12 sm:w-2/12 flex justify-around'>
            <Link to='/login' className='font-bold'>Login</Link>
            <Link to='/signup' className='font-bold'>Signup</Link>
        </div>
    </div>
  )
}

export default Navigation