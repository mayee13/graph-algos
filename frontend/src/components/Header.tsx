import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({username, setUsername} : {username: string, setUsername: (username: string) => void}) {

  const handleLogout = () => {
    setUsername('');
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