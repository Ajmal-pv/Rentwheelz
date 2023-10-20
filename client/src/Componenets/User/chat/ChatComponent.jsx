import React, { useEffect, useRef, useState } from 'react';
import { userChats } from '../../../services/user-Service';
import Conversation from './Conversation';
import ChatBox from './ChatBox'
import io from 'socket.io-client';
const url = import.meta.env.VITE_baseUrl
const socket = io(url)

function ChatComponent() {
  
    const user=localStorage.getItem('userToken')
    const userId=localStorage.getItem('userId')
    const [chats,setChats]=useState([]) 
    const [currentChat,setCurrentChat]=useState(null)
    const[onlineUsers,setOnlineUsers]=useState([])
    const[sendMessage,setSendMessage]=useState('')
    const[recieveMessage,setRecieveMessage]=useState(null)
    const[messages,setMessages]=useState([])

  
   
    useEffect(()=>{
        const getChats= async()=>{
            try {
                const {data}=await userChats(userId)
               
                setChats(data)
                
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    },[user])
   
    // Define an effect to set up the event listener when the component mounts
  useEffect(() => {
    // Emit a "new-user-add" event to notify the server about the new user
    socket.emit("new-user-add", userId);

    // Listen for incoming messages
    socket.on("receive-message", (data) => {
      console.log('Received a message:', data);
      setRecieveMessage(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive-message");
    };
  }, [userId]); // Only set up the listener when `userId` changes

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });
    }, []);

   

    useEffect(()=>{
     
       socket.emit('message',sendMessage)
       setSendMessage('')
      console.log('at send message socket ');
     },[sendMessage])
    

       




  // const checkOnlineStatus = (chat) => {
  //   const chatMember = chat.members.find((member) => member !== user._id);
  //   const online = onlineUsers.find((user) => user.userId === chatMember)
  //   return online ? true : false;
  // };

  return (
    
    <div className="container mx-auto">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-2">
        <div className="border-r border-gray-300 lg:col-span-1 ">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <div className=" h-[32rem] ">
            
            {chats.map((chat)=>(
                <div key={chat._id}  onClick={()=>{
                    setCurrentChat(chat)
                }}>
                    <Conversation data={chat} currentUserId={userId} />
                </div>
           
            ))}
            
          </div>
        </div>
        <div className='w-full '>

            <ChatBox chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} recieveMessage={recieveMessage}  />
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
