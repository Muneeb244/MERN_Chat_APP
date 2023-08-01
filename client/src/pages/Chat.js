import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'

function Chat() {
  return (
    <main className='flex'>
      <section className='w-4/12 h-[90vh] '>
        <Sidebar />
      </section>
      <section className='w-8/12 h-[90vh]'>
        <MessageForm />
      </section>
    </main>
  )
}

export default Chat