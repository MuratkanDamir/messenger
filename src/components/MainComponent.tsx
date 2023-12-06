import FriendsList from "components/FriendsList";
import Chat from "components/Chat";

const style: React.CSSProperties = {
    display: 'flex',
}

const MainComponent: React.FC = () => {
    return (
        <div style={style}>
            <FriendsList />
            <Chat />
        </div>
    );
  }
  
  export default MainComponent;
  
  