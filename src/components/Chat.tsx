import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { addDoc, Timestamp } from "firebase/firestore";
import { db } from "firebaseApp";
import TextField from '@mui/material/TextField';
import { useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, orderBy, query} from "firebase/firestore";
import "./Chat.css";
type Message = {
    createdAt: null | string,
    text: null | string,
    creator: null | string, 
}

const myMesStyle: React.CSSProperties = {
    padding: '5px',
    paddingLeft: '20px',
    width: '400px',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid green',
    marginLeft: 'auto',
    borderRadius: '25px 0px 25px 25px',
    wordBreak:'break-word',
}
const friendMesStyle: React.CSSProperties = {
    padding: '5px',
    paddingRight: '20px',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid green',
    borderRadius: '0px 25px 25px 25px',
}


const Chat: React.FC = () => {

    const [messages, setMessages] = useState<Message []>([]);
    const { chatId } = useAppSelector(state => state.chat)
    const [text, setText] =  useState("");
    
    const {id} = useAppSelector( state => state.user);


    const submitForm = async (e: React.FormEvent) =>{
        e.preventDefault();
        
        try{
            if(chatId !== null){
                const messagesCollectionRef = collection( doc(db, 'chats', chatId), 'messages');
                
                const newMessageData = {
                    creator: id,
                    text: text,
                    createdAt: Timestamp.now().toDate().toISOString(),
                }
                await addDoc(messagesCollectionRef, newMessageData);
            }else{
                throw Error;
            };
            setText("");
        }catch(error){
            console.log(error);
        }

    }


    const fetchMessages = async () => {
        try {
          if (chatId !== null) {
            const messagesCollectionRef = collection(doc(db, 'chats', chatId), 'messages');
            const q = query(messagesCollectionRef, orderBy('createdAt'));
    
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const mes: Message[] = [];
              querySnapshot.forEach((doc) => {
                const messageData = doc.data() as Message;
                mes.push({ ...messageData });
            });
            
            setMessages(mes);

            });
    
            return () => {
              unsubscribe();
            };
          } else {
            throw new Error('Chat ID is null');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
        useEffect(() => {
            fetchMessages();
        }, [chatId]);



    return (
        <div style={{width:'100%', height:'100%', minHeight:'100vh', padding:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
            <h2>messages</h2>
            <hr style={{backgroundColor :'#b7d0e2', marginTop:'10px', marginBottom:'10px'}}/>
            <div style={{padding:'10px', height:'80%' , display: 'flex', flexDirection:'column', gap:'10px', overflowY: "auto"}}>
                {
                    messages.map((m, index)=>(
                        id === m.creator?
                        (<div key = {index} style={myMesStyle} >  <Avatar>Me</Avatar> <p>{m.text}</p>   </div>):
                        (<div key = {index} style={friendMesStyle} > <Avatar>A</Avatar> <p>{m.text}</p>   </div>)
                    ))
                }
            </div>
            <div style={{height:'10%', display:'flex', alignItems:'center',  marginTop:'auto'}}>

                <TextField
                    variant="outlined"
                    placeholder='type your message...'
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{height:'100%'}}
                />
                <SendIcon  onClick={(e) => submitForm(e)}  style={{width:'40px', height:'40px'}}></SendIcon>


            </div>
        </div>
    );
  }
  
  export default Chat;
  