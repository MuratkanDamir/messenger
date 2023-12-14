import Avatar from '@mui/material/Avatar';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db, storage } from 'firebaseApp';
import { useEffect, useState } from 'react';
import styles from "components/ChatItem.module.css";
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { setChat } from 'store/slices/chatSlice';
import { getDownloadURL , ref} from 'firebase/storage';

interface ChatItemProps {
    chatId: string ,
    friendId: string,
    isActive: boolean,
}

interface userObject {
    username: string;
}
const ChatItem: React.FC<ChatItemProps> = (props) =>{

    const [user, setUser] = useState<userObject | null>(null);
    const dispatch = useAppDispatch();

    const imageRef = ref(storage, `profileImages/${props.friendId}`);
    
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");


    async function getUserInfo(id: string){
        try{
            const friendSnapshot: DocumentSnapshot = await getDoc( doc(db, "users", id) );
            
            if (friendSnapshot.exists()) { 
                const friendData = friendSnapshot.data() as userObject;
                setUser(friendData);
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error getting user info:", error);
          }
    }

    useEffect(() => {
        getUserInfo(props.friendId);
        getDownloadURL(imageRef).then((url) =>{
            setProfileImageUrl(url);
        }).catch((error) => {
            console.log("not found Profile Image")
            setProfileImageUrl("");
        })
    },[props.friendId])

    return (
        <div className={props.isActive ? styles.activeMain : styles.nonActiveMain} onClick={() => dispatch(setChat({ chatId: props.chatId, friendId: props.friendId }))}>
                {profileImageUrl == ""? 
                (<Avatar></Avatar>)
                :
                (<Avatar src={profileImageUrl}></Avatar>)
            }
            {user && <p>{user.username}</p>}
        </div>
    )
}

export default ChatItem;