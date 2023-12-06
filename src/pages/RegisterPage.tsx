import { TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

import SuccessRegisterSnack from "components/SuccessRegisterSnack";
import ErrorRegisterSnack from "components/ErrorRegisterSnack";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "firebaseApp";
import { addDoc, collection } from "firebase/firestore";

interface IFormInput {
    email: string,
    username: string,
    password: string,
}

const RegisterPage: React.FC = () =>{

    const {
        register,
        formState: { errors, isValid }, 
        handleSubmit, 
        reset
    } = useForm<IFormInput>(
        {mode: 'onBlur'}
    );

    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [isSucRegSnackOpen, setSucRegSnackOpen] = useState(false);
    const [isErrorRegSnackOpen, setErrorRegSnackOpen] = useState(false);
    const [isErrorText, setErrorText] = useState("");

    const customPstyles = {
        color: 'red',
        paddingLeft: '10px',
        margin: '2px 0px',
        fontSize: '0.85em',
    };

    const onSubmit: SubmitHandler<IFormInput> = async (data) =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const userId = userCredential.user.uid;

            await addDoc(collection(db, "users"), {
                id: userId,
                username: data.username,
              });
            reset();
            setSucRegSnackOpen(true);
        }catch(error: any){
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                console.error('User with this email already exists');
                setErrorText("User with this email already exists")
                setErrorRegSnackOpen(true);
            } else {
                console.error(errorMessage);
                setErrorText("Registration")
                setErrorRegSnackOpen(true);
            }
        }
    };    

    return (
        <div style={{width:'400px', marginTop:'15vh'}}>
            <h1 style={{textAlign:'center'}}> Register </h1>
            <form onSubmit={handleSubmit( onSubmit )} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <div>
                    <TextField
                        style={{width:'100%'}}
                        label="username:"
                        variant="outlined"
                        type="text"
                        { ...register("username", {
                            required: "This field is required",
                            minLength:{
                                value: 3,
                                message: 'must be more than 3 characters'
                            },
                            maxLength:{
                                value: 30,
                                message: 'must be less than 30 characters'
                            },
                            pattern:{
                                value: /^[a-zA-Z][a-zA-Z0-9]*$/,
                                message: 'must start with a letter and contain only letters and numbers'
                            }
                        })}/>
                        {errors.username && ( <p style={customPstyles}> {errors.username.message} </p>)}
                </div>
                <div>
                    <TextField
                        style={{width:'100%'}}  
                        label="email:"
                        variant="outlined"
                        type="text"
                        { ...register("email", {
                            required: "This field is required",
                            pattern:{ 
                                value: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/,
                                message: "wrong email"
                            }
                        })} />
                        {errors.email && ( <p style={customPstyles}> {errors.email.message} </p>)}
                </div>
                <div>        
                    <TextField 
                        style={{width:'100%'}}
                        label="password:"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password",{
                            required: "This field is required",
                            minLength:{
                                value: 8,
                                message: 'must be more than 8 characters'
                            },
                            pattern:{
                                value: /^[a-zA-Z0-9]*$/,
                                message: 'contain only letters and numbers'
                            }
                        })}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                    >
                    </TextField>
                        {errors.password && ( <p style={customPstyles}> {errors.password.message} </p>)}
                </div>
                <Button style={{width:'100px', fontSize:'0.7em'}}size="small" variant="contained" onClick={ () => reset() }>Clear Form</Button>
                <Button disabled={!isValid} variant="contained" color="success" type="submit">Submit</Button>
                <b style={{marginLeft:'10px'}}><i>Already have an account <Link to="/login"> login</Link> </i></b>
            </form>
            

            <SuccessRegisterSnack
                isOpen={isSucRegSnackOpen}
                handleClose={() => setSucRegSnackOpen(false)}
            />
            <ErrorRegisterSnack
                isOpen={isErrorRegSnackOpen}
                handleClose={() => setErrorRegSnackOpen(false)}
                text={isErrorText}
            />
        </div>
    );
}

export default RegisterPage;