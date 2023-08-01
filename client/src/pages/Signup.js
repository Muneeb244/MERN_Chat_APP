import React, { useState } from 'react';
import { ThreeDots } from 'react-loading-icons';
import * as yup from 'yup';
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function Signup() {

    const ref = React.useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [image, setImage] = useState(null);

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    const userSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().min(6, "Password should be 6 characters minimum").required(),
        image: yup.mixed()
            .nullable()
            .required('A file is required')
            .test('File size',
                'File size too big', (value) => !value || (value && value.size <= 1024 * 1024))
            .test('format',
                'Unsupported file format', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    })

    const handleSubmit = (values, { resetForm }) => {
        setIsLoading(true);
        console.log('submit')
    }

    return (
        <div className='flex w-screen h-[90vh]'>
            <section className='w-1/2 h-full flex items-center justify-center'>
                <img src={require('../assets/signup.jpg')} alt='login' className='w-5/6 h-5/6' />
            </section>
            <section className=' w-1/2 h-full flex flex-col justify-center items-center'>
                <Formik
                    initialValues={{ name: "", email: "", password: "", image: "" }}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ values, errors, setFieldValue, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form action='' className='flex flex-col items-center justify-center w-full'>
                            <h1 className='text-3xl font-bold mt-10'>Create account</h1>
                            {message && <h3 className='font-bold text-base text-red-500 mt-2'>{message}</h3>}
                            <div className='flex flex-col justify-center items-center w-1/2'>
                                {image && <img src={image} alt='login' className='mt-5 w-[80px] h-[80px] rounded-full' />}
                                <input type='file' className='mt-5 self-center w-3/5' accept="image/*"
                                    ref={ref}
                                    onChange={(event) => {
                                        setFieldValue("image", event.currentTarget.files[0]);
                                        setImage(URL.createObjectURL(event.currentTarget.files[0]));
                                    }}
                                    onBlur={handleBlur('image')}
                                />
                            </div>
                            <ErrorMessage
                                error={errors["image"]}
                                visible={touched["image"]}
                            />
                            <input
                                type="text"
                                placeholder='name'
                                value={values.email}
                                onChange={handleChange('name')}
                                onBlur={handleBlur('name')}
                                className='mt-7 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black'
                            />
                            <ErrorMessage
                                error={errors["name"]}
                                visible={touched["name"]}
                            />
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
                            <button className='shadow bg-black text-white font-bold py-2 px-4 rounded mt-7' onClick={handleSubmit} type='submit'>
                                {isLoading ? <ThreeDots stroke='white' fill='white' height={15} /> : "Register"}
                            </button>
                            <p className='mt-3'>
                                Already have an account?
                                <Link to='/login' className='text-purple-500'> Signin</Link>
                            </p>
                        </form>
                    )}
                </Formik>
            </section>
        </div>
    )
}

export default Signup