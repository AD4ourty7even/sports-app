import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'
import { Button, TextField, Typography } from '@mui/material'
import { useAppDispatch } from '../types'
import { checkForProfile, createProfile, reset } from '../features/profile/profileSlice'


const CreateProfile: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {user} = useSelector((state: RootState)=> state.auth)
  const {profile, isLoading, isSuccess, isError, message} = useSelector((state: RootState)=> state.profile)

  const [formData, setFormData] = useState({
    phone: '',
    hall: '',
    yearOfStudy: '',
  })

  const {phone, hall, yearOfStudy} = formData

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(checkForProfile())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    if (profile) {
      navigate('/Dashboard')
    }

    dispatch(reset())
  }, [profile, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const profileData = {
      phone, hall, yearOfStudy
    }

    dispatch(createProfile(profileData))
  }

  return (
    <>
      <div  className="w-full h-auto p-2">
        <div className="rounded-md shadow-md mt-10 px-2 py-4  bg-white/10 max-w-[400px] w-full h-auto mx-auto backdrop-blur-sm">
          <Typography variant="h6" className="text-white text-center uppercase">
            Create Profile
          </Typography>
          <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-2 px-3">
                <div className="w-full">
                  <TextField 
                    id="phone" 
                    label="Contact Number"
                    name="phone"
                    type="text"
                    value={phone}
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' , borderColor: 'white'}, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="hall" 
                    label="Hall of Residence"
                    name="hall"
                    value={hall}
                    type="text"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="yearOfStudy" 
                    label="Year of study"
                    name="yearOfStudy"
                    value={yearOfStudy}
                    type="text"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
              </div>
              <div className="pt-4 w-full flex justify-center">
                <Button type="submit" variant="contained" className="w-[200px]" disabled={isLoading}>
                  Create Profile
                </Button>
              </div>
          </form>
        </div>
      </div>
    </>
)
}

export default CreateProfile