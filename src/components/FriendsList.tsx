import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Button from '@mui/material/Button';
import { deleteUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'hooks/hooks';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '30vw',
  minWidth: '200px',
  height: '95vh',
  minHeight: '500px',
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

const FriendsList: React.FC = () => {
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
        <input type="text" />
      </div>

      <div style={style}>
        {isMenuOpen? 
        (
          <animated.div style={{ ...menuStyle, ...menuAnimation }}>
            <div> Item 1</div>

            <Button variant="contained" color="error" onClick={() => dispatch(deleteUser())} >Log out</Button>
          </animated.div>
        ):(
          <div>
            List
          </div>
        )

        }    
        
      </div>
    </div>
  );
};

export default FriendsList;
