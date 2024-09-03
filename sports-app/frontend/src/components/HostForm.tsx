import { Button, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../types'
import { hostGame, reset } from '../features/game/gameSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { toast } from 'react-toastify'

const HostForm: FC = () => {
  const [formData, setFormData] = useState({
    gameType: '',
    location: '',
    date: '',
    startTime: '',
    maxPlayers: '',
  })
  const dispatch = useAppDispatch()
  const {gameType, location, date, startTime, maxPlayers} = formData

  const {isHostedSuccess, isHostedError} = useSelector((state: RootState)=> state.game)

  useEffect(() => {
    if(isHostedSuccess){
      toast.success('Game hosted successfully')
    }
    if(isHostedError){
      toast.error('Failed to host game')
    }
    dispatch(reset());
  }, [isHostedSuccess, isHostedError, dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const {gameType, location, startTime} = formData
    const date = new Date(formData.date)
    const maxPlayers = parseInt(formData.maxPlayers)
    dispatch(hostGame({gameType, location, date, startTime, maxPlayers}))

    setFormData({
      gameType: '',
      location: '',
      date: '',
      startTime: '',
      maxPlayers: '',
    })
  }

  return (
    <>
      <div  className="w-full h-auto p-2">
        <div className="rounded-md shadow-md mt-10 px-2 py-4  bg-white/10 max-w-[400px] w-full h-auto mx-auto backdrop-blur-[2px]">
          <Typography variant="h6" className="text-white text-center uppercase">
            Host A Game
          </Typography>
          <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-2 px-3">
                <div className="w-full">
                  <TextField 
                    id="gameType" 
                    label="Game"
                    placeholder='Football, Volleyball, etc.'
                    name="gameType"
                    type="text"
                    value={gameType}
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' , borderColor: 'white'}, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="location" 
                    label="Location"
                    name="location"
                    value={location}
                    type="text"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="date" 
                
                    name="date"
                    value={date}
                    type="date"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="startTime" 
                    label="Starting Time"
                    name="startTime"
                    value={startTime}
                    type="string"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
                <div className="w-full">
                  <TextField 
                    id="maxPlayers" 
                    label="Maximum number of Players"
                    name="maxPlayers"
                    value={maxPlayers}
                    type="number"
                    onChange={onChange} 
                    variant="standard" 
                    className="w-full" 
                    sx={{ input: { color: 'white' }, label: { color: 'white' } }} />
                </div>
              </div>
              <div className="pt-4 w-full flex justify-center">
                <Button type="submit" variant="contained" className="w-[200px]">
                  Host Game
                </Button>
              </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default HostForm