import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface RegisterSnackProps{
    isOpen: boolean,
    handleClose: () => void,
}

const ErrorLoginSnack: React.FC<RegisterSnackProps> = ({isOpen , handleClose}) =>{
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="error"> Invalid login or password</Alert>
      </Snackbar>
    );
}

export default ErrorLoginSnack;