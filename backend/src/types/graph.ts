export interface Graph {
    id: number;
    username: string; // who owns the graph
    name: string;     // optional: graph name
    data: any;        // actual graph structure (you can define stricter types later)
}