import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillWechat } from "react-icons/ai";
import { useSelector } from 'react-redux';

function Navigation() {

  const user = useSelector(state => state.user)

  return (
    <div className='flex justify-between items-center shadow-md px-5 py-2'>
        <Link to='/' className='font-bold'>
        <AiFillWechat color='#000' size={45} className='' />
        </Link>
        <div className='w-4/12 sm:w-2/12 flex justify-around items-center'>
            {!user && <Link to='/login' className='font-bold'>Login</Link>}
            <Link to={!user && '/signup'} className='font-bold mr-10'>{user ? "logout" : "Signup"}</Link>
            {user && <div className='flex items-center'>
            
              <img src={user.user.image} alt='user' className='w-[50px] h-[50px] rounded-full' />
              <p className='font-bold ml-2'>{user.user.name}</p>
            </div>}
        </div>
    </div>
  )
}

export default Navigation