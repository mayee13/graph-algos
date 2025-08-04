import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles/GraphCanvas.css';
import { Node, Link } from '../types/graph';

// This component renders a graph using D3.js
export default function GraphCanvas({
  nodes,
  links,
  options,
  visitedNodes,
  visitedEdges
}: {
  nodes: Node[];
  links: Link[];
  options: { directed: boolean; weighted: boolean };
  visitedNodes: string[];
  visitedEdges: Link[];
}) {

  // Reference to the SVG element
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {

    // Fix width and height of the SVG
    const width = 600;
    const height = 450;

    // Set background color and dimensions of the SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#f5f5f5');

    // Clear previous content in the SVG
    svg.selectAll('*').remove();

    // Define arrowhead marker
    svg.append('defs')
    .append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 25) // controls how far arrowhead is from node center
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#aaa');

    // Edit this to modify repulsion strength and link distance
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create link and node elements
    const link = svg.append('g')
      .attr('stroke', '#aaa')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('marker-end', options.directed ? 'url(#arrowhead)' : null);

    const linkLabel = svg.append('g')
      .selectAll('text')
      .data(links)
      .enter()
      .append('text')
      .text(d => options.weighted && d.weight !== undefined ? d.weight.toString() : '')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .attr('font-weight', 'bold')
      .attr('stroke', 'white')        
      .attr('stroke-width', 0.5);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#6c2bd9')
      .call(drag(simulation));
    
    // Add text labels to nodes
    const nodeLabel = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')           // center horizontally
      .attr('dominant-baseline', 'middle')     // center vertically
      .attr('fill', 'white');                  // optional: contrast with circle


    // Simulates node and link movement
    simulation.on('tick', () => {
      nodes.forEach(node => {
        node.x = Math.max(10, Math.min(node.x!, width - 10));  
        node.y = Math.max(10, Math.min(node.y!, height - 10));
      });
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
      
      nodeLabel
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
      
      linkLabel
      .attr('x', d => {
        const x1 = (d.source as Node).x!;
        const y1 = (d.source as Node).y!;
        const x2 = (d.target as Node).x!;
        const y2 = (d.target as Node).y!;
    
        const midX = (x1 + x2) / 2;
        // const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offset = 10; // Adjust this value as needed
    
        return midX + (dy / length) * offset;
      })
      .attr('y', d => {
        const x1 = (d.source as Node).x!;
        const y1 = (d.source as Node).y!;
        const x2 = (d.target as Node).x!;
        const y2 = (d.target as Node).y!;
    
        // const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offset = 10;
    
        return midY - (dx / length) * offset;
      });
    });

    // Add drag behavior to nodes
    function drag(simulation: d3.Simulation<Node, undefined>) {
      return d3.drag<SVGCircleElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [nodes, links, options]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const nodeSelection = svg.selectAll<SVGCircleElement, Node>('circle');
    const linkSelection = svg.selectAll<SVGLineElement, Link>('line');
    if (visitedNodes.length === 0 && visitedEdges.length === 0) {
      setTimeout(() => {
        nodeSelection
          .transition()
          .duration(300)
          .attr('fill', '#6c2bd9'); // Reset to purple
        linkSelection
          .transition()
          .duration(300)
          .attr('stroke', '#aaa'); // Reset links to gray
      }, 50);
      return;
    }

    if (visitedNodes.length === 0 && visitedEdges.length > 0) {
      visitedEdges.forEach((edge, i) => {
        setTimeout(() => {
          linkSelection
            .filter(d =>
              (((d.source as Node).id === edge.source) && ((d.target as Node).id === edge.target)) ||
              (((d.source as Node).id === edge.target) && ((d.target as Node).id === edge.source))
            )
            .transition()
            .duration(300)
            .attr('stroke', '#ff00ff'); // magenta
        }, i * 800);
      });

    }
  
    visitedNodes.forEach((nodeId, i) => {
  
      setTimeout(() => {
        // If nodeId is '_', skip highlighting
        if (nodeId === '_') {
          setTimeout(() => {
            nodeSelection
              .transition()
              .duration(300)
              .attr('fill', '#6c2bd9'); // Reset to purple
            linkSelection
              .transition()
              .duration(300)
              .attr('stroke', '#aaa'); // Reset links to gray
          }, 50);
        } else {
        // 1. Highlight current node in red
        nodeSelection
          .filter(d => d.id === nodeId)
          .transition()
          .duration(300)
          .attr('fill', '#e74c3c'); // red
  
        // 2. Highlight the edge from previous node in magenta
        if (i > 0 && nodeId !== '_') {
          const prev = visitedEdges[i - 1].source;
          const curr = visitedEdges[i-1].target;

          linkSelection
            .filter(d =>
              (((d.source as Node).id === prev) && ((d.target as Node).id === curr)) ||
              (((d.source as Node).id === curr) && ((d.target as Node).id === prev))
            )
            .transition()
            .duration(300)
            .attr('stroke', '#ff00ff'); // magenta
        }
  
        // 3. After another delay, mark node as visited (orange)
        setTimeout(() => {
          nodeSelection
            .filter(d => d.id === nodeId)
            .transition()
            .duration(300)
            .attr('fill', '#f39c12'); // orange
        }, 400); // red visible for 400ms before switching
        }
      }, i * 800);
    });
  }, [visitedNodes, visitedEdges]);

  return (
    <div className="graph-canvas-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}
