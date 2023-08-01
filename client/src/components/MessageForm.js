import React from 'react';
import { BiSolidPaperPlane } from "react-icons/bi";

function MessageForm() {
    return (
        <div className='w-full h-fit'>
            <div className='w-full h-[80vh] border-gray border-[2px] mt-1'></div>
            <div className='flex items-center justify-around p-2'>
                <input type='text' placeholder='your message' className='bg-white appearance-none border-gray-200 rounded w-11/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none border-gray border-2 focus:border-gray-500' />
                <button className='flex justify-center items-center w-[40px] h-[40px] bg-yellow-400 rounded hover:bg-yellow-500'>
                    <BiSolidPaperPlane color='#fff' size={20} className='' />
                </button>
            </div>
        </div>
    )
}

export default MessageForm