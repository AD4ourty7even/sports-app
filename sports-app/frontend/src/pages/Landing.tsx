import { Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'


const Landing: FC = () => {
  return (
    <>
      <div className='w-full px-[20px] pt-[100px] '>
        <div className = "w-full md:w-[70%] flex flex-col gap-5 ">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to our platform</h1>
          </div>
          <div>
            <p className="text-white text-[16px] font-bold md:text-[20px]">
              "Ever found yourself ready to play but without enough players? Our game hosting app is designed just for that—helping you connect with others who are ready to jump into a game when you are. Whether it's a quick match or a longer session, find players instantly and get the game going!"
            </p>
          </div>
          <Button component={Link} to ="/register" variant='contained' sx={{ width: 180}} >Get Started</Button>
        </div>
      </div>
    </>
  )
}

export default Landing