import React, { useEffect, useState } from 'react';
import './jobDetails.css';




function JobPostingDetailsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [editJob, setEditJob] = useState({ description: '', salary: '', summary: '' }); 

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch('http://localhost:4000/getJobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        const uniqueTitles = [...new Set(data.map(job => job.title))];
        setTitles(uniqueTitles);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  };

  const handleTitleChange = (event) => {
    setSelectedTitle(event.target.value);
    setSelectedJob(null); 
  };

  const handleJobClick = (title) => {
    setSelectedTitle(title);
    setSelectedJob(null); 
  };

  const handleBackClick = () => {
    setSelectedTitle('');
    setSelectedJob(null);
  };

  const handleEditClick = (job) => {
    setIsEditing(true);
    setEditJob(job);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${editJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editJob),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        const updatedJobs = jobs.map(job => job.id === updatedJob.job.id ? updatedJob.job : job);
        setJobs(updatedJobs);
        setIsEditing(false);
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteClick = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const remainingJobs = jobs.filter(job => job.id !== jobId);
        setJobs(remainingJobs);
        setSelectedJob(null);
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditJob({ ...editJob, [name]: value });
  };

  const filteredJobs = selectedTitle
    ? jobs.filter(job => job.title === selectedTitle)
    : [];

  return (
    <div>
      
      <h1 className="jobDetails">Job Postings</h1>

      <div>
        {selectedTitle ? (
          <div>
            <button onClick={handleBackClick}>Back to Titles</button>
            {filteredJobs.length > 0 ? (
              <ul className="job-list">
                {filteredJobs.map(job => (
                  <li key={job.id} onClick={() => setSelectedJob(job)}>
                    {isEditing && selectedJob && selectedJob.id === job.id ? (
                      <div>
                        <h2>{job.title}</h2>
                        <label>Description:</label>
                        <input
                          type="text"
                          name="description"
                          value={editJob.description}
                          onChange={handleInputChange}
                        />
                        <label>Salary:</label>
                        <input
                          type="text"
                          name="salary"
                          value={editJob.salary}
                          onChange={handleInputChange}
                        />
                        <label>Summary:</label>
                        <input
                          type="text"
                          name="summary"
                          value={editJob.summary}
                          onChange={handleInputChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Summary:</strong> {job.summary}</p>
                        <div className='editDelete'>
                          <button onClick={() => handleEditClick(job)}>Edit</button>
                          <button className='deleteButton' onClick={() => handleDeleteClick(job.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No job postings available.</p>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="titleFilter">Filter by Title: </label>
            <select id="titleFilter" value={selectedTitle} onChange={handleTitleChange}>
              <option value="">All</option>
              {titles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>

            {titles.length > 0 ? (
              <ul className="job-list">
                {titles.map(title => (
                  <li key={title} onClick={() => handleJobClick(title)}>
                    <h2>{title}</h2>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No job postings available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobPostingDetailsPage;
