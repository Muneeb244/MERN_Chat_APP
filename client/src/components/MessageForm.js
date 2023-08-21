import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiSolidPaperPlane } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { AppContext } from '../context/AppContext';

function MessageForm() {

    const [message, setMessage] = useState("");
    const user = useSelector(state => state.user);
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
    const msgEndRed = useRef(null)


    useEffect(() => {
        scrollToBottom();
    }, [messages])

    function getFormatedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }

    const todayDate = getFormatedDate();

    socket.off("room-messages").on("room-messages", (roomMessage) => {
        setMessages(roomMessage)
    })

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const minutes = today.getMinutes().toString() < 10 ? '0' + today.getMinutes().toString() : today.getMinutes().toString();
        const time = today.getHours().toString() + ':' + minutes;
        const roomId = currentRoom;
        socket.emit('message-room', roomId, message, user, time, todayDate);
        setMessage("");
    }

    
    return (
        <div className='w-full h-fit'>
            <div className='w-full h-[80vh] border-gray border-[2px] mt-1 overflow-auto'>
                {!user && <div className='flex items-center w-full h-10 px-5'>Please Login</div>}
                {user && messages.map(({ _id: date, messagesByDate }, index) => {
                    return <div key={index} className='w-full h-[80vh] text-center mt-2 bg-gray-300 z'>
                        <p>{date}</p>
                        {messagesByDate?.map(({content, time, from: sender}, msgIndex)=> {
                            return <div className=' w-1/2 mb-2' key={msgIndex}>
                                <div className='bg-yellow-300'>
                                <img className='w-[40px] h-[40px] rounded-full mr-3' src={sender.user.image} alt="" />
                                <p>{sender.user._id === user.user._id ?  sender.user.name : "You"}</p>
                                <p>{content}</p>
                                <p>{time}</p>
                                </div>
                            </div>
                        })}
                    </div>
                })}
            <div ref={messageEndRef}></div>
            </div>
            <div className='flex items-center justify-around p-2'>
                <input type='text' placeholder='your message' value={message} onChange={e => setMessage(e.target.value)} className='bg-white appearance-none border-gray-200 rounded w-11/12 p-2 text-gray-700 leading-tight focus:outline-none border-gray border-2 focus:border-gray-500' />
                <button className='flex justify-center items-center w-[40px] h-[40px] bg-yellow-400 rounded hover:bg-yellow-500' disabled={!user} onClick={message !== "" ? handleSubmit: () => {} }>
                    <BiSolidPaperPlane color='#fff' size={20} className='' />
                </button>
            </div>
        </div>
    )
}

export default MessageForm