import { TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


interface IFormInput {
    email: string,
    username: string,
    password: string,
}

const LoginPage: React.FC = () =>{

    const {
        register,
        formState: { errors, isValid }, 
        handleSubmit, 
        reset,
    } = useForm<IFormInput>(
        {mode: 'onBlur'}
    );

    const onSubmit: SubmitHandler<IFormInput> = (data) =>{
        console.log(data)
        reset();
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
        <div style={{width:'400px'}}>
            <h1 style={{textAlign:'center'}}> Login </h1>
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
            </form>
        </div>
    );
}

export default LoginPage;