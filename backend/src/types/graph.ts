export interface Graph {
    id: number;
    username: string; // who owns the graph
    name: string;     // optional: graph name
    data: any;        // actual graph structure (you can define stricter types later)
    directed: boolean; // whether the graph is directed or not
    weighted: boolean;  // whether the graph is weighted or not
}