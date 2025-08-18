import { useNavigate } from 'react-router-dom';
import { fetchGraphs, deleteGraph } from '../api/graphs';
import { useState, useEffect } from 'react';
import { Graph } from '../algorithm/graphBuild';
import { objectToGraph } from '../api/utils';
import './styles/SavedGraphs.css'

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
    const [selected, setSelected] = useState<String>("");
    const [selectedGraphId, setSelectedGraphId] = useState<number | null>(null);

    useEffect(() => {
        loadGraphs();
    }, [username]);

    async function loadGraphs() {
        try {
            const graphs = await fetchGraphs(username);
            setUserGraphs(graphs);
        } catch (err) {
            console.error('Failed to fetch graphs', err);
        }
    }

    function handleOpen(graph: BackendGraph) {
        const graphMap = objectToGraph(graph.data);
        setLoadedGraph(graphMap); 
        setGraphName(graph.name);
        setOptions({ directed: graph.directed, weighted: graph.weighted });
        navigate('/canvas'); // navigate to the canvas editor
    }

    async function handleDelete(graph: BackendGraph) {
        try {
            // Call API to delete the graph
            await deleteGraph(graph.id);
            // Reload graphs after deletion
            await loadGraphs();
            setSelectedGraphId(null);
            setSelected(""); 
        } catch (err) {
            console.error('Failed to delete graph', err);
        }
    }

    function handleGraphClick(graph: BackendGraph) {
        console.log(graph.id)
        if (selected === graph.name) {
            setSelected(""); 
            setSelectedGraphId(null); 
        } else {
            setSelected(graph.name); 
            setSelectedGraphId(graph.id); 
        }
    }

    function handleBackClick() {
        setLoadedGraph(null); 
        setGraphName(''); 
        setOptions({ directed: false, weighted: false });
        setSelected(''); // reset selected graph
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
                        {selectedGraphId === graph.id && (
                                <div className='graph-action-buttons'>
                                    <button className='button-13' onClick={() => handleOpen(graph)}>Open</button>
                                    <button className='button-13' onClick={() => handleDelete(graph)}>Delete</button>
                                </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        
        <button onClick={handleBackClick} className='button-17'>Go to Editor</button>
      </div>
    );
  }
  