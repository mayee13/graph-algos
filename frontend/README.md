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

<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
