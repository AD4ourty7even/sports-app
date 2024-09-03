import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { gameType, useAppDispatch } from '../types';
import { joinGame} from '../features/game/gameSlice';
import GameDetails from './GameDetails';


export default function GameCard({game, joined}: {game: gameType, joined: boolean}) {
  const date = new Date( game.date)

  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(joinGame(game._id))

  }

  return (
    <Card sx={{ minWidth: 275 , maxWidth: 400}} className='h-[220px] min-h-[220px] sm:h-[200px] sm:min-h-[200px]'>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className = "capitalize">
          Hosted By: {game.hostName}
        </Typography>
        <Typography variant="h4" component="div" className = "capitalize">
          {game.gameType}
        </Typography>
        <div className="flex gap-5 flex-wrap justify-between">
            <Typography color="text.secondary" className = "uppercase">
                {game.location}
            </Typography>
            <Typography color="text.secondary">
                {date.toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary" className = "uppercase">
                {game.startTime}
            </Typography>
        </div>
        <div className="flex gap-1 flex-wrap justify-between">
            <Typography color="text.secondary">
                Maximum Players: {game.maxPlayers}
            </Typography>
            <Typography color="text.secondary">
                Participants: {game.participants.length}
            </Typography>
        </div>
      </CardContent>
      {
        !joined ? ( 
          <div className = "pb-2 flex justify-center w-full">
            <Button variant="contained" color="primary" onClick = {handleClick}>Join Game</Button>
          </div>
        ) : (
          <div className='pb-2 w-full flex justify-center'>
            <GameDetails participants = {game.participants}/>
          </div>
        )
      }
    </Card>
  );
}