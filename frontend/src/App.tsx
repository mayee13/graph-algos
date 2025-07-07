import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import SavedGraphs from './components/SavedGraphs'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/savedgraphs" element={<SavedGraphs />} />
      </Routes>
    </Router>
  );
}

export default App;
