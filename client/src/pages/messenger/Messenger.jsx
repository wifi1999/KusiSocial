import "./messenger.css"
import Topbar from '../../components/topbar/Topbar';
import Conversation from "../../components/conversations/Conversation";
import Message  from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { io } from 'socket.io-client';

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.1.84:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(user.followings.filter(following => users.some(user => user.userId !== following)));
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async(req, res) => {
      try{
        const res = await axios.get('/conversation/' + user._id);
        setConversations(res.data);
      } catch(err){
        console.error(err);
      }
    }
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async() => {
      try{
        const res = await axios.get('/message/' + currentChat?._id);
        setMessages(res.data); 
      } catch(err){
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    const receiverId = currentChat.members.find(member => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage
    });

    try{
      const res = await axios.post('/message', message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Topbar />
      <div className="messenger">

        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                <Conversation key={conversation._id} conversation={conversation} currentUser={user} />
              </div>
                
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat 
                ? 
                <>         
                  <div className="chatBoxTop">
                    {messages.map((message) => (
                      <div key={message._id} ref={scrollRef}>
                        <Message key={message._id} message={message} own={message.sender && message.sender === user._id} />
                      </div>   
                    ))};         
                  </div>

                  <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='Write something...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                  </div>

                </> 
                : 
                <span className="noConversationText"> Open a conversation to start a chat</span>
            }

          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline key={user._id} onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}
