import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "firebaseApp";
import { useAppSelector } from "hooks/hooks";
import { useState } from "react";

const Chat: React.FC = () => {

    const {messages, chatId } = useAppSelector(state => state.chat)
    const [text, setText] =  useState("");
    const {id} = useAppSelector( state => state.user);
    const submitForm = async (e: React.FormEvent) =>{
        e.preventDefault();
        
        try{
            // Получение ссылки на подколлекцию "messages" внутри документа
            if(chatId !== null){
                const messagesCollectionRef = collection( doc(db, 'chats', chatId), 'messages');
                
                // Данные нового сообщения
                const newMessageData = {
                    creator: id,
                    text: text,
                    createdAt: Timestamp.now().toDate().toISOString(),
                }
                // Добавление нового документа в подколлекцию "messages"
                await addDoc(messagesCollectionRef, newMessageData);
            }else{
                throw Error;
            };
            setText("");
        }catch(error){
            console.log(error);
        }

    }
    
    return (
        <div >
            messages
            {
                messages.map((m, index)=>(
                        <div key = {index}>
                            {m.text}
                        </div>
                    )
                )
            }
            <div>
                <form onSubmit={(e) => submitForm(e) }>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                    <input type="submit" value="send" />
                </form>
            </div>
        </div>
    );
  }
  
  export default Chat;
  