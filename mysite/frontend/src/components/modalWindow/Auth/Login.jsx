import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import {LoginThunk} from '../../../redux/authUser'

const schema = yup.object().shape({
    login: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле").min(5, "Минимальна длина 5 символов")
  });


function LoginInAc({errorMessageL}) {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm(
        {
            mode: "onBlur",
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = (data) => {
        if (data){
            dispatch(LoginThunk(data.login, data.password))
            console.log(data)
        }
    }
   

    return (
        <>
            <form className="containerForm" onSubmit={handleSubmit(onSubmit)} >
                <TextField 
                    id="login" 
                    label="Логин" 
                    name="login" 
                    type="login"
                    variant="outlined" 
                    autoFocus
                    error={!!errors.login}
                    helperText={errors.login && errors.login.message}
                    {...register("login")}
                
                />
                <TextField 
                    id="password"
                    name="password" 
                    type="password" 
                    label="Пароль" 
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password && errors.password.message}
                    {...register("password")} 
                   
                />
                {errorMessageL && <div className='formError'>{errorMessageL}</div>}
                <Button type="submit" variant="contained">
                    Войти
                </Button>
            </form>
            
        </>
    )
}

export default LoginInAc
