import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from 'react-redux';


function Home() {

    const navigation = useNavigate();
    const user = useSelector(state => state.user);
    if(user) navigation('/chat');

    return (
        <div className='flex w-screen h-[90vh]'>
            <section className=' w-1/2 h-full flex flex-col justify-center items-center'>
                <div className=''>
                    <h1 className='text-4xl font-bold mb-3'>Share the world with your friends</h1>
                    <p>Chat App lets you connect with the world</p>
                    <button className='flex items-center bg-green-700 p-2 rounded mt-3 w-fit'>
                        <Link to='/login' className='text-white'>Get Started</Link>
                        <AiFillMessage color='#fff' size={30} className=' ml-1' />
                    </button>
                </div>
            </section>
            <section className='w-1/2 h-full flex items-center'>
                <img src={require('../assets/home.jpg')} alt='home' className='w-full h-fit' />
            </section>
        </div>
    )
}

export default Home