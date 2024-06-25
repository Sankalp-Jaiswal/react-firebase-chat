import React, { useEffect, useState } from 'react'
import "./ChatList.css"
import AddUser from './addUser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

const ChatList = () => {
    const [addMode, setAddMode] =useState(false)
    const [chats, setChats] =useState([])
    const {currentUser} = useUserStore()
    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats

            const promises = items.map(async(item)=>{
                const userDocRef = doc(db, "userss", item.receiverId);
                const userDocSnap = await getDoc(docRef);

                const user = userDocSnap.data()

                return{...item, user}
            })

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt))


        });

        return ()=>{
            unSub()
        }
    },[currentUser.id])

    console.log(chats)

  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="/search.png" alt="" />
                <input type="text " placeholder='search' />
            </div>
            <img src={addMode? "/minus.png": "/plus.png"} onClick={()=>setAddMode((prev)=>(!prev))}  className='add' alt="" />
        </div>

        {chats.map(chat=>(
            <div className="item" key={chat.chatId}>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Sankalp</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
        ))}
        
        
        {addMode && <AddUser/>}
    </div>
  )
}

export default ChatList