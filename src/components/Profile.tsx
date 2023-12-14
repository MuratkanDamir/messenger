import { useAppDispatch, useAppSelector } from "hooks/hooks";
import Avatar from '@mui/material/Avatar';
import { useState , useEffect} from 'react';
import {
  ref,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "firebaseApp";
import { deleteChat } from 'store/slices/chatSlice';

import { deleteUser } from 'store/slices/userSlice';
import Button from '@mui/material/Button';

import ProfileSettings from "components/ProfileSettings";

const Profile: React.FC = () => {

    const dispatch = useAppDispatch()

    const {username} = useAppSelector(state => state.user);
    const { id } =  useAppSelector(state => state.user);
    
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const imageRef = ref(storage, `profileImages/${id}`);

    useEffect(() =>{
        getDownloadURL(imageRef).then((url) =>{
            setProfileImageUrl(url);
        }).catch((error) => {
            console.log("not found Profile Image")
            setProfileImageUrl("");
        })
    },[])

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', paddingTop:'50px'}}>
            {profileImageUrl == ""? 
                (<Avatar sx={{ width: 156, height: 156 }} ></Avatar>)
                :
                (<Avatar src={profileImageUrl} sx={{ width: 156, height: 156 }} ></Avatar>)
            }
            <h3>{username}</h3>
            <ProfileSettings />
            <Button variant="contained" color="error" onClick={() => {
                dispatch(deleteUser())
                dispatch(deleteChat())
            }} >Log out</Button>

        </div>
    );
  }
  
  export default Profile;
  