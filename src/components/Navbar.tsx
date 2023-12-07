import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Button from '@mui/material/Button';
import { deleteUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'hooks/hooks';
import Profile from 'components/Profile';
import Chats from 'components/Chats';
import Search from 'components/Search';

const style: React.CSSProperties = {
  paddingTop:'10px',
  display: 'flex',
  flexDirection: 'column',
  width: '30vw',
  minWidth: '200px',
  height:'100%',
  backgroundColor: 'blue',
};
const btnStyle={
  width: '35px', 
  height: '35px' ,
}
const menuStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'green',
  zIndex: 1,
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  const menuAnimation = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    transform: `translateX(${isMenuOpen ? '0%' : '-100%'})`,
  });

  return (
    <div style={style}>
      <div style={{ display: 'flex' }}>

        <MenuTwoToneIcon
          style={btnStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Search />
      </div>

      <div style={style}>
        {isMenuOpen? 
        (
          <animated.div style={{ ...menuStyle, ...menuAnimation }}>
            <Profile />

            <Button variant="contained" color="error" onClick={() => dispatch(deleteUser())} >Log out</Button>
          </animated.div>
        ):(
          <Chats />
        )

        }    
        
      </div>
    </div>
  );
};

export default Navbar;
