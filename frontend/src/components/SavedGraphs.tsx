import { useNavigate } from 'react-router-dom';
import { fetchGraphs } from '../api/graphs';
import { useState, useEffect } from 'react';
import { Graph } from '../algorithm/graphBuild';
import { objectToGraph } from '../api/utils';
import './SavedGraphs.css'

interface BackendGraph {
    id: number;
    username: string;
    name: string;
    data: Record<string, { node: string; weight?: number }[]>;
    directed: boolean;
    weighted: boolean;
}

// required props: username and graphname (must pass to main layout as well), graph data must be sent back as well 
export default function SavedGraphs({username, setGraphName, setLoadedGraph, setOptions}: { username: string, setGraphName: (name: string) => void, setLoadedGraph: (graph: Graph | null) => void, 
setOptions: (options: { directed: boolean; weighted: boolean }) => void }) {
    const navigate = useNavigate();
    const [userGraphs, setUserGraphs] = useState<BackendGraph[]>([]);
  
    useEffect(() => {
        async function load() {
            try {
                const graphs = await fetchGraphs(username);
                setUserGraphs(graphs);
            } catch (err) {
                console.error('Failed to fetch graphs', err);
            }
        }
        load(); 
    }, [username]);

    function handleGraphClick(graph: BackendGraph) {
        const graphMap = objectToGraph(graph.data);
        setLoadedGraph(graphMap); 
        setGraphName(graph.name);
        setOptions({ directed: graph.directed, weighted: graph.weighted });
        navigate('/canvas'); // navigate to the canvas editor
    }

    function handleBackClick() {
        setLoadedGraph(null); 
        setGraphName(''); 
        setOptions({ directed: false, weighted: false });
        navigate('/canvas'); 
    }
  
    return (
      <div className='saved-graphs-container'>
        <h1>Saved Graphs</h1>
        <div className='graph-list-box'>
            <ul className='graph-list'>
                {userGraphs.map((graph) => (
                    <li key={graph.id} className='graph-list-item'>
                        <button onClick={() => handleGraphClick(graph)} className='button-17'>
                            {graph.name || `Untitled Graph (${graph.id})`}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
        <button onClick={handleBackClick} className='button-17'>Go to Editor</button>
      </div>
    );
  }
  