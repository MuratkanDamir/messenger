import { useAppSelector } from "hooks/hooks";

const Profile: React.FC = () => {

    const {username} = useAppSelector(state => state.user);

    return (
        <div>
            {username}
        </div>
    );
  }
  
  export default Profile;
  