import { TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { fetchUser } from "store/slices/userSlice";
import ErrorLoginSnack from "components/ErrorLoginSnack";


interface IFormInput {
    email: string,
    password: string,
}

const LoginPage: React.FC = () =>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors, isValid }, 
        handleSubmit, 
        reset,
    } = useForm<IFormInput>(
        {mode: 'onBlur'}
    );

    const [errorSnackOpen, setErrorSnackOpen] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async (data) =>{
        const info = {
            email: data.email,
            password: data.password,
        }
        try{
            await dispatch(fetchUser(info));
            reset();
            navigate("/");
        }catch(error){
            console.log("errorrrrrrrr");
            setErrorSnackOpen(true);
            reset();
        }

    };

    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const customPstyles = {
        color: 'red',
        paddingLeft: '10px',
        margin: '2px 0px',
        fontSize: '0.85em',
    };

    return (
        <div style={{width:'400px', marginTop:'15vh'}}>
            <h1 style={{textAlign:'center',marginBottom:'30px'}}> Login </h1>
            <form onSubmit={handleSubmit( onSubmit )} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <div>
                    <TextField
                        style={{width:'100%'}}  
                        label="email:"
                        variant="outlined"
                        type="text"
                        { ...register("email", {
                            required: "This field is required"
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
                <Button disabled={!isValid} variant="contained" color="success" type="submit">Submit</Button>
                <b style={{marginLeft:'10px'}}><i>Don`t have an account <Link to="/register"> register</Link> </i></b>
            </form>
            <ErrorLoginSnack
                isOpen={errorSnackOpen}
                handleClose={() => setErrorSnackOpen(false)}
            />
        </div>
    );
}

export default LoginPage;