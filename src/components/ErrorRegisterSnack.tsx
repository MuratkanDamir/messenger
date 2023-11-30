import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface RegisterSnackProps{
    isOpen: boolean,
    handleClose: () => void,
}

const ErrorRegisterSnack: React.FC<RegisterSnackProps> = ({isOpen , handleClose}) =>{
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="error"> Registration error ! </Alert>
      </Snackbar>
    );
}

export default ErrorRegisterSnack;