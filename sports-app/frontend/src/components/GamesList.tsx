import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
import CustomTabPanel from './CustomTabPanel';
import GameCard from './GameCard';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getGames } from '../features/game/gameSlice';
import { useAppDispatch } from '../types';
import { toast } from 'react-toastify';

export default function GamesList() {
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch()

  const {games, isError} = useSelector((state: RootState) => state.game)

  const {user} = useSelector((state: RootState) => state.auth)

  React.useEffect(() => {
    dispatch(getGames())

    if(isError) {
      toast.error("Unable to fetch games")
    }

  }, [isError, dispatch])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const today = new Date(); // Get the current date

// Filter games whose date is later than or equal to today
  const upcomingGames = games.filter((game) => {
    const gameDate = new Date(game.date); // Convert the game's date to a Date object
    return gameDate >= today; // Compare the game's date with today's date
  });

  const availableGames = upcomingGames.filter((game) => ((game.participants.length < game.maxPlayers) && !game.participants.some(participant => participant.userId === (user ? user._id : ''))))

  const myGames = games.filter((game) => game.hostName === user?.name)

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
            sx={{ 
                '& .MuiTab-root': {
                  color: '#fff', // Unselected tab text color
                },
                '& .Mui-selected': {
                  color: '#ffee58', // Selected tab text color
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffee58', // Tab indicator color
                }
              }}
        >
          <Tab label="Available Games" {...a11yProps(0)} />
          <Tab label="Joined Games" {...a11yProps(1)} />
          <Tab label="Hosted Games" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto scrollbar-thin">
          {
            availableGames.length!==0 ? [...availableGames]
            .sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
            .map((game)=>(
              <GameCard game = {game} joined = {false} key={game._id}/>
            )):(
              <p className = "text-center text-gray-400 font-sans">
                No games to show
              </p>
            )
          }
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto scrollbar-thin">
          {
            myGames.length!==0 ? [...myGames]
            .sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
            .map((game)=>(
              <GameCard game = {game} joined = {true} key={game._id}/>
            )) : (
              <p className = "text-center text-gray-400 font-sans">
                No games to show
              </p>
            )
          }
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto scrollbar-thin">
          {
            upcomingGames.length!==0 && 
            [...upcomingGames].filter((game)=>Array.isArray(game.participants) && game.participants.length!==0 && game.participants.some(participant => participant.userId === (user ? user._id : ''))).length !== 0 ? 
            [...upcomingGames].filter((game)=>Array.isArray(game.participants) && game.participants.length!==0 && game.participants.some(participant => participant.userId === (user ? user._id : '')))
            .sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
            .map((game)=>(
              <GameCard game = {game} joined = {true} key={game._id}/>
            )) : (
              <p className = "text-center text-gray-400 font-sans">
                No games to show
              </p>
            )
          }
        </div>
      </CustomTabPanel>
    </Box>
  );
}