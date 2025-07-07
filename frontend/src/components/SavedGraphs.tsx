import { useNavigate } from 'react-router-dom';

export default function() {
    const navigate = useNavigate();
    return(<div>
        <h1>Saved Graphs</h1>
        <p>This feature is under development. Please check back later.</p>
        <button onClick={() => navigate('/')}>Back to Editor</button>
    </div>)
}