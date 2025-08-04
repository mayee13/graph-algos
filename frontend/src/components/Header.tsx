import './styles/Header.css';
import { Link } from 'react-router-dom';
import { Graph } from '../algorithm/graphBuild';

export default function Header({
  username, 
  setUsername, 
  setGraphName,
  setLoadedGraph} : {
    username: string, 
    setUsername: (username: string) => void,
    setGraphName: (name: string) => void,
    setLoadedGraph: (graph: Graph | null) => void} ) {

  const handleLogout = () => {
    setUsername('');
    setLoadedGraph(null);
    setGraphName('');
  };

    return (
      <header className="header">
        <div className="user-info">
          {(username !== "" )? `Welcome, ${username}` : ''}
        </div>
        <h1>Graph Algorithm Visualizer</h1>
        <nav className="nav-links">
          <Link to="/" onClick={handleLogout}>Login Page</Link>
          <Link to="/canvas">Graph Canvas</Link>
      </nav>
      </header>
    );
}