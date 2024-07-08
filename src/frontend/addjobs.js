import React, { useState } from 'react';
import './addJobs.css'

function AddJobPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [summary, setSummary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newJob = { title, company, description, salary };

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        const { message, job } = await response.json();
        setMessage(message);
        setTitle('');
        setCompany('');
        setDescription('');
        setSalary('');
        setSummary(job.summary); // Set summarized text in state
      } else {
        setMessage('Failed to add job.');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      setMessage('Error adding job.');
    }
  };

  return (
    <div>
      <div className="add-job-page">
        <h1>Add a New Job</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
}

export default AddJobPage;
