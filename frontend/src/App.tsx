import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import SavedGraphs from './components/SavedGraphs'; 
import Login from './components/Login';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Header username={username} setUsername={setUsername}/>
      <Routes>
        <Route path="/" element={<Login user={username} setUser={setUsername}/>} />
        <Route path="/canvas" element={<MainLayout />} />
        <Route path="/savedgraphs" element={<SavedGraphs />} />
      </Routes>
    </Router>
  );
}

export default App;
