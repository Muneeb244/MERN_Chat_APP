import React from 'react'

function Sidebar() {

    const rooms = ['first room', 'second room', 'third room'];

    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-1/3'>
                <h1 className='w-3/5 font-bold text-3xl text-left mb-2'>Available rooms</h1>
                <div className='w-3/5 h-1/2'>
                    {rooms.map(room => (
                        console.log(room),
                        <div key={room} className='w-full'>
                            <h3 className='border-gray border-[1px] p-2'>{room}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full h-1/2'>
                <h1 className='font-bold text-2xl'>Members</h1>
            </div>
        </>
    )
}

export default Sidebar