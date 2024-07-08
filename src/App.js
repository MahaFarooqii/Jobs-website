import React from 'react';
import './App.css';
import Home from './frontend/home.js'
import AddJob from './frontend/addjobs.js'
import JobDetails from './frontend/jobDetails.js'
import Login from './frontend/login.js'
import Navbar from './frontend/navbar.js'

function App() {
  let RenderedComponent; 
    switch(window.location.pathname){
        case "/":
        RenderedComponent = <Home/>;
        break;
        case "/addJob":
        RenderedComponent = <AddJob/>;
        break;
        case "/getJobs":
        RenderedComponent = <JobDetails/>;
        break;
        case "/login":
        RenderedComponent = <Login/>;
        break;
       

        default:
        RenderedComponent = null; // Handle unknown routes 
    }
  return (
    <>
       <Navbar/>
      {RenderedComponent}
    </>
  );
}

export default App;
