import Chat from "components/Chat";
import { useAppSelector } from "hooks/hooks";
import { Navigate } from "react-router-dom";


const HomePage: React.FC = () =>{

    const { token } = useAppSelector(state => state.user);

    return !!token ? (<Chat />) : (<Navigate to="/login"/>);
}

export default HomePage;