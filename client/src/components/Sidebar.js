import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppContext } from '../context/AppContext';
import {TailSpin} from 'react-loading-icons';

function Sidebar() {

    const user = useSelector(state => state.user);
    const {socket, setMembers, members, setCurrentRoom, setRooms, rooms, privateMemberMsg, setPrivateMemberMsg, currentRoom} = useContext(AppContext);

    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload);
    });

    useEffect(() => {
        if(user){
            setCurrentRoom("general");
            getRooms();
            socket.emit('join-room', 'general');
            socket.emit('new-user');
        }
    }, [])

    const getRooms = async () => {
        fetch('http://localhost:5000/rooms')
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(err => console.log(err));
    }

    const joinRoom = (room, isPublic = true) => {
        if(!user) return alert('Please login first');

        socket.emit('join-room', room);
        setCurrentRoom(room);
        if(isPublic) setPrivateMemberMsg(null)

        // socket 
    }

    if(!user) return <></>


    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-1/2'>
                <h1 className='w-3/5 font-bold text-3xl text-left mb-2'>Available rooms</h1>
                <div className='w-3/5 h-1/2'>
                    {rooms.length > 0 ? rooms.map((room, index) => (
                        <div key={index} className='w-full'>
                            <h3 className='border-gray border-[1px] p-2 cursor-pointer' onClick={() => joinRoom(room)}>
                                {room} {currentRoom !== room && <span></span>}
                            </h3>
                        </div>
                    )) : <TailSpin color='#000' stroke='#000' />}
                </div>
            </div>
            <div className='flex flex-col w-full h-1/2 items-center'>
                <h1 className='font-bold text-2xl'>Members</h1>
                <div className='w-3/5 h-1/2'>
                    {members.map((member, index) => (
                        <div key={index} className='w-full'>
                            <h3 className='border-gray border-[1px] p-2'>{member.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar