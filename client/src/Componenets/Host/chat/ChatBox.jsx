import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages, gethost } from '../../../services/user-Service'
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { Button} from 'antd';
import { SendOutlined} from '@ant-design/icons';

function ChatBox({chat,currentUser,setSendMessage,recieveMessage}) {
    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
    const scroll=useRef()
    
    
    useEffect(() => {
      if (recieveMessage !== null ) {
        
        setMessages([...messages, recieveMessage]);
      }
    }, [recieveMessage]);

    // always scroll to the last message
useEffect(()=>{
  scroll.current?.scrollIntoView({behaviour:'smooth'})
  },[messages])
  

    useEffect(()=>{
        const userId=chat?.members?.find((id)=>id !== currentUser)
        const getUserData=async()=>{
            try {  
                const {data}= await gethost(userId)
                
                
           setUserData(data)
            } catch (error) {
                console.log(error);
            }
           
        }
        if(chat!==null) getUserData()
    },[chat,currentUser])
  useEffect(()=>{
    const fetchMessages= async ()=>{
        try {
            const {data}=await getMessages(chat._id)
           
            setMessages(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    if(chat !== null) fetchMessages()
  },[chat])
const handleSend=(newMessage)=>{
    setNewMessage(newMessage)
}
const handleMessage = async (e) => {
  e.preventDefault();

  if (newMessage.trim() === '') {
    return;
  }

  const message = {
    senderId: currentUser,
    text: newMessage,
    chatId: chat._id,
  };

  try {
    const { data } = await addMessage(message);
    setMessages([...messages]);
    setNewMessage('');
  } catch (error) {
    console.log(error);
  }

  const recieverId = chat.members.find((id) => id !== currentUser);

  setSendMessage({ ...message, recieverId });
};


 // to scroll into latest message
 useEffect(() => {
  scroll?.current?.scrollIntoView({ behaviour: "smooth" });
}, [messages]);

  return (
    <div className="w-[100] ">
      {chat?(
      <div>
        
        <div className="w-full ">
            <div className="relative flex items-center p-3 border-2 border-gray-100">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src='https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg'
              
              />
          
              <span className="block ml-2 font-bold  text-gray-600">{userData?.name}</span>
              
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
          

           
            <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-slate-200">
            {messages.map((message)=>(
           <div  key={message._id} ref={scroll}>
              <ul className="space-y-2 mb-4">
                
                <li className={message.senderId === currentUser ? "flex justify-end" : "flex justify-start" }>
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block text-xl">{message.text}</span>
                    <span className='text-xs' >{format(message.createdAt)}</span>
                  </div>
                </li>
              </ul>
              </div>
              ))}
            </div>

            
          </div>
          
          <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
            
            <InputEmoji
  value={newMessage}
  onChange={(value)=>{handleSend(value)}}
/>
             

             
             
              {/* <button type="submit"
              onClick={handleMessage}>
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 6a1 1 0 001.169 1.409l5-1.429A1 1 0 009 7.571V3a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-6z"
                  />
                </svg>
              </button> */}
              <Button
      type="submit"
      onClick={handleMessage}
      icon={<SendOutlined />} 
      className='bg-blue-500'
    >
      
    </Button>
            </div>
            </div>
            ):(
               <div>
                <span >Tap on a chat to start a conversation</span>
               </div>
             )}
             
    </div>
  )
}

export default ChatBox