import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
      return alert('Can not login!');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Can not login!')
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Creating account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName ?.message}
            {...register('fullName', {required: 'Fullname'})} className={styles.field} label="Fullname" fullWidth />
        <TextField error={Boolean(errors.email?.message)}
            helperText={errors.email ?.message}
            type='email'
            {...register('email', {required: 'email'})} className={styles.field} label="E-Mail" fullWidth />
        <TextField error={Boolean(errors.password?.message)}
            helperText={errors.password ?.message}
            type='password'
            {...register('password', {required: 'password'})} className={styles.field} label="password" fullWidth />
          <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
            Sign Up
          </Button>
      </form>
    </Paper>
  );
};
