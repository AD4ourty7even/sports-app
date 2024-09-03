import { FC } from 'react'
import { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'
// import { checkForProfile } from '../features/profile/profileSlice'
// import { useAppDispatch } from '../types'
import GamesList from '../components/GamesList'
import HostForm from '../components/HostForm'
import authService from '../features/auth/authService'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../types'
import { reset } from '../features/game/gameSlice'


const Dashboard: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const dispatch = useAppDispatch()
  const {user} = useSelector((state: RootState)=> state.auth)
  // const {profile, isError} = useSelector((state: RootState)=> state.profile)
  const {isJoinedError, isJoinedSuccess} = useSelector((state: RootState) => state.game)

  useEffect(() => {
    if(isJoinedError){
      toast.error('Failed to join game')
      dispatch(reset());
    }
    if(isJoinedSuccess){
      toast.success('Game joined successfully')
      dispatch(reset());
    }
  }, [isJoinedError, isJoinedSuccess, dispatch])

  useEffect(()=>{
    if(!user){
        navigate('/login')
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        authService.subscribeUser();
      }
    });
    
  }, [user, navigate])

  return (
    <>
      <div className="flex flex-col md:flex-row p-4 h-auto">
        <div className = "w-full md:w-[50%]">
            <GamesList/>
        </div>
        <div className = "w-full md:w-[50%]">
            <HostForm/>
        </div>
      </div>
    </>
  )
}

export default Dashboard