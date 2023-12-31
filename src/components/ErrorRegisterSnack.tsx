import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface RegisterSnackProps{
    isOpen: boolean,
    handleClose: () => void,
    text: string,
}

const ErrorRegisterSnack: React.FC<RegisterSnackProps> = ({isOpen , handleClose, text}) =>{
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="error"> {text} </Alert>
      </Snackbar>
    );
}

export default ErrorRegisterSnack;