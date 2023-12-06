import FriendsList from "components/FriendsList";
import Chat from "components/Chat";

const MainComponent: React.FC = () => {
    return (
        <div style={{display:"flex"}}>
            <FriendsList />
            <Chat />
        </div>
    );
  }
  
  export default MainComponent;
  
  