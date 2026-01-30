import { Lock, Mail, User2Icon, UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../config/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { useRef } from 'react'



const Register = () => {


    const urlState = query.get('state')
    const googleRef = useRef(null);

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password match check
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const { data } = await api.post(`/api/users/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            dispatch(login({ token: data.token, user: data.user }));
            localStorage.setItem('token', data.token);
            toast.success(data.message);

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };


    const handleGoogleLogin = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const { data } = await api.post(`/api/users/googlesignin`, { token })
            dispatch(login({ token: data.token, user: data.user }))
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error?.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    return (

        <div className="flex h-screen w-full overflow-hidden">
            <div className="w-full hidden md:inline-block">
                <img className="h-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
            </div>

            <div className="w-full flex flex-col items-center justify-center">

                <form
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

                    <div className='py-4'>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => console.log("Login Failed")}
                            theme="outline"
                            size="large"
                            shape="pill"
                            text="continue_with"
                            width="300px"

                        />
                    </div>




                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-200 focus-within:border-green-500 focus-within:shadow-md">
                        <User2Icon className='size-6' color='gray' />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email id"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none focus:outline-none focus:ring-0 bg-none"
                            required
                        />
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-200 focus-within:border-green-500 focus-within:shadow-md mt-4">
                        <UserIcon className='size-6' color='gray' />
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="User Name"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none focus:outline-none focus:ring-0 bg-none"
                            required
                        />
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-200 focus-within:border-green-500 focus-within:shadow-md mt-4">
                        <Lock className='size-6 ' color='gray' />
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none focus:outline-none focus:ring-0"
                            required
                        />
                    </div>

                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-200 focus-within:border-green-500 focus-within:shadow-md mt-4">
                        <Lock className='size-6 ' color='gray' />
                        <input
                            name="confirmPassword"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full border-none focus:outline-none focus:ring-0"
                            required
                        />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input className="h-5" type="checkbox" id="checkbox" />
                            <label className="text-sm" htmlFor="checkbox">Remember me</label>
                        </div>
                        <a className="text-sm underline" href="#">Forgot password?</a>
                    </div>

                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        Login
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <a className="text-indigo-400 hover:underline" href="#">Sign up</a></p>
                </form>
            </div>
        </div>
    )
}

export default Register