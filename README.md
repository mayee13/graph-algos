# About this app - Graph Algorithm Visualizer

The purpose of this web application is to provide a tool for generating graphs and visualizing common graph algorithms. 

## How to Run this Application 
- In the frontend directory, run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- In the backend directory, run:

### `npm dev`

This will start the backend server on [http://localhost:8080](http://localhost:8080). 

## How to use Graph Algorithms Visualizer
1. When the website is first launched, users will see the login page. For this application, only a username is required to register and login. 
    - For new users, users must register before logging in. 
    - For returning users, users can proceed directly with entering their username to log in. 
2. Once the users log in, they will be taken to a page with a list of their previously saved graphs. 
    - To open a graph, users may simply click on the name of the graph they wish to open, then click the "open" button. 
    - To delete a graph, users may simply click on the name of the graph they wish to delete, then click the "delete" button. 
    - To create a new graph from scratch, users may click the "Go to Editor" button to be taken to the Graph Canvas. 
3. In the graph canvas, users have the following options for creating or editing graphs: 
    - Give the graph a new name
    - Set the weighted and directed options of the graph with checkboxes 
    - Change the number of nodes in the graph with a slider
    - Add edges between two nodes, optionally with weight 
    - Generating a random graph with the "Generate" button
    - Save a graph with the "Save" button
    - Navigate back to the graph list page with the "Load" button
4. To run a graph algorithm, users may click on the "Run" button to run an algorithm. 
    - Users may first decide which category of algorithms they wish to run using the first select element. 
    - Users may then deicde which node they wish to star the animation at using the second select element. 
    - Finally, users may run the algorithm they choose by selecting "Run". 

## Frameworks and Libraries used in this application 
- React 
- Express.js
- d3.js

## Languages
- Typescript 
- HTML 
- CSS 