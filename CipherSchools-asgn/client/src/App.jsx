import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewVideo from './pages/ViewVideo';

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
      <Route exact path='/' element={<Dashboard/>}/>
      <Route path='video/:videoId' element={<ViewVideo/>}/>
      </Routes>
    </div>
    </Router>
  );
};

export default App;
