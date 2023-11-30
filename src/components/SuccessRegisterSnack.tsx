import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface RegisterSnackProps{
    isOpen: boolean,
    handleClose: () => void,
}

const SuccessRegisterSnack: React.FC<RegisterSnackProps> = ({isOpen , handleClose}) =>{
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="success" > Successfully registered ! </Alert>
      </Snackbar>
    );
}

export default SuccessRegisterSnack;