import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export type Node = SimulationNodeDatum & {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

export type Link = SimulationLinkDatum<Node> & {
  source: string;
  target: string;
  weight?: number;
};
