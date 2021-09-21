import React, {useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import {registrationThunk, setRegistrationStatus} from '../../../redux/authUser'


const schema = yup.object().shape({
    login: yup.string().required("Обязательное поле"),
    email: yup.string().email("Email некорректин").required("Обязательное поле"),
    password: yup.string().required('Обязательное поле').min(5, "Минимальна длина 5 символов"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
  });

function Registration({transitionLogin, errorMessageR}) {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm(
        {
            mode: "onBlur",
            resolver: yupResolver(schema)
        }
    );

    useEffect(() => {
        dispatch(setRegistrationStatus(false))
    }, [])

    const onSubmit = (data) => {
        if (data){
            dispatch(registrationThunk(data.login, data.email, data.password))
        }
    }

    return (
        <>
            <form className="containerForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        id="login" 
                        name="login" 
                        type="login"
                        label="Логин" 
                        variant="outlined" 
                        autoFocus
                        error={!!errors.login}
                        helperText={errors.login && errors.login.message}
                        {...register("login")}
                    />
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email"
                        label="Email" 
                        variant="outlined" 
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                        {...register("email")}
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

                    <TextField 
                        id="passwordConfirmation"
                        name="password" 
                        type="password"
                        label="Повторите пароль" 
                        variant="outlined" 
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation && errors.passwordConfirmation.message}
                        {...register("passwordConfirmation")}
                    />

                    {errorMessageR && <div className='formError'>{errorMessageR}</div>} 

                    <Button type="submit" variant="contained" color="primary">
                        Зарегистрироваться
                    </Button>
            </form>
            
        </>
    )
}

export default Registration
