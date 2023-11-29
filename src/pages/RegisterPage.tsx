import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInput {
    email: string,
}

const RegisterPage: React.FC = () =>{

    const {
        register, 
        handleSubmit, 
        reset
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) =>{console.log(data)};
    return (
        <div>
            <FormControl onSubmit={handleSubmit( onSubmit )}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </div>
    );
}

export default RegisterPage;