const express = require('express');
const fs = require('fs').promises; 
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const jobsFilePath = path.join(__dirname, 'jobs.json');
const usersFilePath = path.join(__dirname, 'company.json'); 

// Function to read jobs from JSON file
const readJobsFromFile = async () => {
  try {
    const data = await fs.readFile(jobsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading jobs file:', err);
    return [];
  }
};

// Function to write jobs to JSON file
const writeJobsToFile = async (jobs) => {
  try {
    await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
  } catch (err) {
    console.error('Error writing jobs file:', err);
    throw err; 
  }
};

// Function to read users from JSON file
const readUsersFromFile = async () => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Function to get user by email
const getUserByEmail = async (email) => {
  const users = await readUsersFromFile();
  return users.find(user => user.email === email);
};

// Endpoint to get all jobs
app.get('/getJobs', async (req, res) => {
  try {
    const jobs = await readJobsFromFile();
    res.json(jobs);
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
});

// Endpoint to add a job
app.post('/api/addJob', async (req, res) => {
  try {
    const { title, company, description, salary, summary } = req.body;
    const jobs = await readJobsFromFile();
    const newJob = { id: jobs.length + 1, title, company, description, salary, summary };
    jobs.push(newJob);
    await writeJobsToFile(jobs);
    res.json({ message: 'Job added successfully', job: newJob });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// Endpoint to get a specific job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10); 
    const jobs = await readJobsFromFile();
    const job = jobs.find(job => job.id === jobId);

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update a specific job by ID
app.put('/api/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const { title, description, salary, summary } = req.body;

  try {
    let jobs = await readJobsFromFile();
    const jobIndex = jobs.findIndex(job => job.id === jobId);

    if (jobIndex === -1) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Updating the job
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      title,
      description,
      salary,
      summary
    };

    // Writing updated jobs back to file
    await writeJobsToFile(jobs);

    res.json({ message: 'Job updated successfully', job: jobs[jobIndex] });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Endpoint to delete a specific job by ID
app.delete('/api/jobs/:id', async (req, res) => {
  const jobId = parseInt(req.params.id, 10); 

  try {
    let jobs = await readJobsFromFile();
    const updatedJobs = jobs.filter(job => job.id !== jobId);

    if (jobs.length === updatedJobs.length) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Writing updated jobs back to file
    await writeJobsToFile(updatedJobs);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Endpoint to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await getUserByEmail(email);

    // Checking if user exists and password matches
    if (user && user.password === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
