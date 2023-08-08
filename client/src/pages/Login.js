import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { Formik } from "formik";
import { ThreeDots } from 'react-loading-icons';
import ErrorMessage from '../components/ErrorMessage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useLoginUserMutation} from '../services/appApi';
import {AppContext} from '../context/AppContext'

function Login() {

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [loginUser, {isLoading, error}] = useLoginUserMutation();
    const {socket} = useContext(AppContext);
    


    const userSchema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().min(6, "Password should be 6 characters minimum").required(),
    })

    const handleSubmit = async (values, {resetForm}) => {
        const user = await loginUser({email: values.email, password: values.password});
        console.log(user)
        if(user.data.user){
            socket.emit('new-user');
            return navigate('/chat');
        }
        setMessage(user.data.message || user.data.error);
    }

    return (
        <div className='flex w-screen h-[90vh]'>
            <section className=' w-1/2 h-full flex flex-col justify-center items-center'>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form action='' className='flex flex-col items-center justify-items-center w-full'>
                            <h1 className='text-3xl font-bold mt-10'>Sign In</h1>
                            {message && <h3 className='font-bold text-base text-red-500 mt-2'>{message}</h3>}
                            <input
                                type="text"
                                placeholder='email'
                                value={values.email}
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                className='mt-7 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black'
                            />
                            <ErrorMessage
                                error={errors["email"]}
                                visible={touched["email"]}
                            />

                            <input
                                type="password"
                                placeholder='Password'
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                className='mt-7 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black'
                            />
                            <ErrorMessage
                                error={errors["password"]}
                                visible={touched["password"]}
                            />
                            <button className='shadow bg-green-700 text-white font-bold py-2 px-4 rounded mt-7' onClick={handleSubmit} type='submit'>
                                {isLoading ? <ThreeDots stroke='white' fill='white' height={15} /> : "Login"}
                            </button>
                            <p className='mt-3'>
                                Don't have an account? 
                                <Link to='/signup' className='text-purple-500'> SignUp</Link>
                            </p>
                        </form>
                    )}
                </Formik>
            </section>
            <section className='w-1/2 h-full flex items-center'>
                <img src={require('../assets/login.jpg')} alt='login' className='w-full h-fit' />
            </section>
        </div>
    )
}

export default Login