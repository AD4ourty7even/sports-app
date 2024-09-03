import { Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from "react-toastify"
import {register, reset} from '../features/auth/authSlice'
import { RootState } from "../app/store";
import { useAppDispatch } from "../types";


function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    password2: ''
  })

  const {email, name, password, password2} = formData;

  const {user, isLoading, isError, isSuccess, message} = useSelector(
      (state: RootState)=> state.auth 
  )

  useEffect(()=>{
      if(isError){
          toast.error(message as string)
      }

      if(isSuccess || user){
          navigate('/createProfile')
      }

      dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(password !== password2){
      toast.error('passwords do not match')
    }
    else{
        const userData = {
            name,
            email,
            password
        }

        dispatch(register(userData))
    }
  }

  return (
    <>
      <div  className="w-full h-auto p-2">
        <div className="rounded-md shadow-md mt-10 px-2 py-4  bg-white/10 max-w-[400px] w-full h-auto mx-auto backdrop-blur-sm">
          <Typography variant="h6" className="text-white text-center uppercase">
            Register a new account
          </Typography>
          <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-2 px-3">
                <div className="w-full">
                  <TextField 
                    id="email" 
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' , borderColor: 'white'}, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="name" 
                    label="Name"
                    name="name"
                    value={name}
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="password" 
                    label="Password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="password2" 
                    label="Confirm password"
                    name="password2"
                    value={password2}
                    type="password"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
              </div>
              <div className="pt-4 w-full flex justify-center">
                <Button type="submit" variant="contained" className="w-[200px]" disabled={isLoading}>
                  Sign Up
                </Button>
              </div>
              <p className="text-center text-white mt-4">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
              </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
