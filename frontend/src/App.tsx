import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import SavedGraphs from './components/SavedGraphs'; 
import Login from './components/Login';
import Header from './components/Header';
import { useState } from 'react';
import { Graph } from './algorithm/graphBuild';

function App() {
  const [username, setUsername] = useState("");
  const [loadedGraph, setLoadedGraph] = useState<Graph | null>(null);
  const [graphName, setGraphName] = useState("");
  const [options, setOptions] = useState({ directed: false, weighted: false });

  return (
    <Router>
      <Header username={username} setUsername={setUsername} setGraphName={setGraphName} setLoadedGraph={setLoadedGraph}/>
      <Routes>
        <Route path="/" element={<Login setUser={setUsername}/>} />
        <Route path="/canvas" element={<MainLayout user={username} graph={graphName} setGraphName={setGraphName} graphInfo={loadedGraph} options={options} setOptions={setOptions}/>} />
        <Route path="/savedgraphs" element={<SavedGraphs username={username} setGraphName={setGraphName} setLoadedGraph={setLoadedGraph} setOptions={setOptions}/>} />
      </Routes>
    </Router>
  );
}

export default App;
