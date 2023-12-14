import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { db, storage } from "firebaseApp";
import TextField from '@mui/material/TextField';
import { useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query, addDoc, getDoc, Timestamp} from "firebase/firestore";
import "./Chat.css";
import { getDownloadURL, ref } from 'firebase/storage';
type Message = {
    createdAt: null | string,
    text: null | string,
    creator: null | string, 
}

type FriendData = {
    userId: string | null,
    username: string | null,
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
    wordBreak:'break-word',
}


const Chat: React.FC = () => {

    const [messages, setMessages] = useState<Message []>([]);
    const { chatId, friendId } = useAppSelector(state => state.chat)
    const [text, setText] =  useState("");
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [friendProfileImageUrl, setFriendProfileImageUrl] = useState<string>("");
    const {id} = useAppSelector( state => state.user);
   
    const [ friendName , setFriendName ] = useState("");
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
                setText("");
                await addDoc(messagesCollectionRef, newMessageData);
            }else{
                throw Error;
            };
            
        }catch(error){
            console.log(error);
        }

    }

    const fetchFriendName = async () =>{
        if (friendId != null){
            const docRef = doc(db, "users", friendId);
            try{
                const docSnapshot = await getDoc( docRef );
                const friendData: FriendData | undefined = docSnapshot.data() as FriendData | undefined;
                if (friendData && friendData.username) {
                    setFriendName(friendData.username);
                    console.log(friendData.username);
                } else {
                    console.log("Friend data does not contain username");
                }
            }catch(error){
                console.log("Fetch friendName Error")
            }
        }else{
            console.log("Friend id is null");
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
            fetchFriendName();

            fetchMessages();
            
            getDownloadURL(ref(storage, `profileImages/${id}`)).then((url) =>{
                setProfileImageUrl(url);
            }).catch((error) => {
                console.log("not found Profile Image")
                setProfileImageUrl("");
            })

            getDownloadURL(ref(storage, `profileImages/${friendId}`)).then((url) =>{
                setFriendProfileImageUrl(url);
            }).catch((error) => {
                console.log("not found Friend Profile Image")
                setFriendProfileImageUrl("");
            })
        }, [chatId]);


    return (
        <div style={{width:'100%', height:'100%', minHeight:'100vh', padding:'20px', display:'flex', flexDirection:'column', gap:'10px'}}>
            <div style={{display:'flex', gap:'20px'}}>
                { friendProfileImageUrl == "" ? (<Avatar sx={{ width: 36, height: 36 }} ></Avatar>) : (<Avatar sx={{ width: 36, height: 36 }} src={friendProfileImageUrl}></Avatar>)}
                <h2> {friendName} </h2>
            </div>
            <hr style={{backgroundColor :'#b7d0e2', marginTop:'10px', marginBottom:'10px'}}/>
            <div style={{padding:'10px', height:'80%' , display: 'flex', flexDirection:'column', gap:'10px', overflowY: "auto"}}>
                {
                    messages.map((m, index)=>(
                        id === m.creator?
                        (<div 
                            key = {index} 
                            style={myMesStyle} >
                            { profileImageUrl == "" ? (<Avatar></Avatar>) : (<Avatar src={profileImageUrl}></Avatar>)} 
                            <p>{m.text}</p>   
                        </div>
                        )
                        :
                        (<div 
                            key = {index} 
                            style={friendMesStyle} > 
                            { friendProfileImageUrl == "" ? (<Avatar></Avatar>) : (<Avatar src={friendProfileImageUrl}></Avatar>)}
                            <p>{m.text}</p>   
                        </div>
                        )
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
  