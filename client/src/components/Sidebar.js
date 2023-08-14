import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/AppContext';
import { TailSpin } from 'react-loading-icons';
import {addNotifications, resetNotifications} from '../Redux/userSlice'

function Sidebar() {

    const user = useSelector(state => state.user);
    const { socket, setMembers, members, setCurrentRoom, setRooms, rooms, privateMemberMsg, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

    const dispatch = useDispatch();

    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload);
    });

    useEffect(() => {
        if (user) {
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

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    const joinRoom = (room, isPublic = true) => {
        if (!user) return alert('Please login first');

        socket.emit('join-room', room);
        setCurrentRoom(room);
        if (isPublic) setPrivateMemberMsg(null)

        dispatch(resetNotifications(room));
    }

    socket.off('notifications').on('notifications', (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user.user._id, member._id);
        joinRoom(roomId, false);
    }


    if (!user) return <></>


    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-1/2'>
                <h1 className='w-3/5 font-bold text-3xl text-left mb-2'>Available rooms</h1>
                <div className='w-3/5 h-1/2'>
                    {rooms.length > 0 ? rooms.map((room, index) => (
                        <div key={index} className={currentRoom === room ? "flex flex-row items-center w-full border-gray border-[1px] bg-blue-600 text-white" : "flex flex-row items-center w-full border-gray border-[1px]"}>
                            <h3 className='w-[90%] p-2 cursor-pointer' onClick={() => joinRoom(room)}>
                                {room}
                            </h3>
                            <div className='w-[50px] h-[50px] text-black flex justify-center items-center'>{user.user.newMessages[room]}</div>
                        </div>
                        // </div>
                    )) : <TailSpin color='#000' stroke='#000' />}
                </div>
            </div>
            <div className='flex flex-col w-full h-1/2 items-center'>
                <h1 className='font-bold text-2xl'>Members</h1>
                <div className='w-3/5 h-1/2 cursor-pointer'>
                    {members.map((member, index) => {
                        return (
                        <div key={index} className={member._id === user.user._id ? 'w-full text-gray-400' : (privateMemberMsg?._id === member?._id ? 'w-full bg-blue-500' : 'w-full')} onClick={member._id !== user.user._id ? () => handlePrivateMemberMsg(member) : () => {}} >
                            <h3 className='border-gray border-[1px] p-2'>{member.name}</h3>
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}

export default Sidebar