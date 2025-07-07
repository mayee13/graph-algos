import { useState } from 'react';
import Header from '../components/Header';
import GraphCanvas from '../components/GraphCanvas';
import GraphControls from '../components/GraphControls';
import GraphAlgos from '../components/GraphAlgos';
import './MainLayout.css';
import { Node, Link } from '../types/graph';


export default function MainLayout() {
  // Initial state shows graph controls
  const [showAlgos, setShowAlgos] = useState(false);

  // Single node initially
  const [nodes, setNodes] = useState<Node[]>([
    {id: 'A'}
  ]);

  // Links are empty initially
  const [links, setLinks] = useState<Link[]>([]);

  // Options for the graph type
  const [options, setOptions] = useState({
    directed: false,
    weighted: false,
  });

  // GraphControls: Function to set the number of nodes and delete any 
  // links that reference non-existent nodes
  const setNodeCount = (count: number) => {
    const newNodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const char = String.fromCharCode(65 + i); 
      newNodes.push({ id: char });
    }
    setNodes(newNodes);
    const validIds = new Set(newNodes.map((n) => n.id));
    setLinks((prev) =>
      prev.filter((link) => validIds.has(link.source) && validIds.has(link.target))
    );
  }

  // GraphControls: Function to add an edge between two nodes
  const addEdge = (start: string, end: string, weight?: number) => {
    const newEdge : Link = {
      source: start,
      target: end,
    };
    if (options.weighted) {
      newEdge.weight = weight;
    }
    setLinks((prev) => [...prev, newEdge]);
  }

  return (
    <div>
      <Header />
      <div className="main-layout">
        <div className="item">
          {showAlgos ? (
            <GraphAlgos 
            onBackClick={() => setShowAlgos(false)}
            nodes={nodes}/>
          ) : (
            <GraphControls 
            onRunClick={() => setShowAlgos(true)} 
            setNodeCount={setNodeCount}
            addEdge={addEdge}
            options={options}
            setOptions={setOptions}
            nodes={nodes}
            />
          )}
        </div>
      <div className="item">
          <GraphCanvas nodes={nodes} links={links} options={options}/>
      </div>
  </div>

    </div>
  );
}

