import { useState } from "react";
import './GraphAlgos.css';
import { useNavigate } from "react-router-dom";

export default function GraphAlgos({ 
    onBackClick,
    nodes 
}: { 
    onBackClick: () => void 
    nodes: { id: string }[];
}) {
  const [selectedOption, setSelectedOption] = useState("simple");
  const navigate = useNavigate();
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case "simple":
        return <SimpleTraversal />;
      case "shortest":
        return <ShortestPath />;
      case "minimum":
        return <MinimumSpanning />;
      case "other":
        return <Other />;
      default:
        return null;
    }
  };

  return (
    <div className="graph-algos-container">
      {/* Top Select Dropdown */}
      <div>
      <label htmlFor="algoType">Algorithm Type</label>
      <select
        name="algoType"
        id="algoType"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="simple">Simple Traversal</option>
        <option value="shortest">Shortest Path</option>
        <option value="minimum">Minimum Spanning</option>
        <option value="other">Other</option>
      </select>
      </div>
      

      {/* Start Node Selector */}
      <div>
        <label htmlFor="startNode">Start Node</label>
        <select name="startNode" id="startNode">
        {nodes.map((node) => (
              <option key={node.id} value={node.id}>
            {node.id}
            </option>
        ))}
        </select>
      </div>
      {/* Conditionally Render Algorithm Buttons */}
      {renderSelectedComponent()}
      <div>
        <button className="button-17" onClick={onBackClick}>Back to Editor</button>
      </div>
    </div>
  );

  // Subcomponents
  function SimpleTraversal() {
    return (
      <div>
        <div>
            <label htmlFor="BFS">Breadth First Search</label>
            <button className="button-17" id="BFS">Run</button>
        </div>
        <div>
            <label htmlFor="DFS">Depth First Search</label>
            <button className="button-17" id="DFS">Run</button>
        </div>
      </div>
    );
  }

  function ShortestPath() {
    return (
      <div>
        <div>
            <label htmlFor="Dijkstra">Dijkstra</label>
            <button className="button-17" id="Dijkstra">Run</button>
        </div>
        <div>
            <label htmlFor="Bellman">Bellman Ford</label>
            <button className="button-17" id="Bellman">Run</button>
        </div>
      </div>
    );
  }

  function MinimumSpanning() {
    return (
      <div>
        <div>
            <label htmlFor="Prim">Prim's Algorithm</label>
            <button className="button-17" id="Prim">Run</button>
        </div>
        <div>
            <label htmlFor="Kruskal">Kruskal's Algorithm</label>
            <button className="button-17" id="Kruskal">Run</button>
        </div>
      </div>
    );
  }

  function Other() {
    return (
      <div>
        <div>
            <label htmlFor="Topological">Topological Sort</label>
            <button className="button-17" id="Topological">Run</button>
        </div>
        <div>
            <label htmlFor="Ford">Ford Fulkerson</label>
            <button className="button-17" id="Ford">Run</button> 
        </div>
      </div>
    );
  }
}
