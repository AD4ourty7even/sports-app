import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateProfile from './pages/CreateProfile';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#ffee58',
      },
      secondary: {
        main: '#000000',
      },
    },
  }
)

function App() {

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen" style={{ backgroundImage: 'url(/bg-2.jpg)' }}>
            <ToastContainer/>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element = {<Dashboard/>}/>
              <Route path="/createProfile" element = {<CreateProfile/>}/>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
