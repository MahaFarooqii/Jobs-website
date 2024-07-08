import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from '../assets/jobs.jpeg';
import './home.css';


function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch('http://localhost:4000/getJobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  };

  const handleJobClick = (job) => {
    fetch(`http://localhost:4000/api/jobs/${job.id}`)
      .then(response => response.json())
      .then(data => {
        setSelectedJob(data);
      })
      .catch(error => console.error('Error fetching job details:', error));
  };

  // Table render function
  const renderJobTable = () => {
    return (
      <table className="job-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} onClick={() => handleJobClick(job)}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Router>
      <div className="App">
        
        <img src={logo} className="App-logo" alt="logo" />

        <h1 className='heading'>JobDigest: One Step to Effortless Job Posting and Summarization</h1>
        <h1 className="jobDetails">Job Postings</h1>

        {selectedJob ? (
          <div className="job-details-container">
            
            <h2><strong>Title:</strong>{selectedJob.title}</h2>
            <p><strong>Salary:</strong>{selectedJob.salary}</p>
            <p><strong>Description:</strong>{selectedJob.description}</p>
            <p><strong>Company:</strong>{selectedJob.company}</p>
            <p><strong>Summary:</strong> {selectedJob.summary}</p>
            <button onClick={() => setSelectedJob(null)}>Back to List</button>
          </div>
        ) : (
          renderJobTable()
        )}
      </div>
    </Router>
  );
}

export default App;
