from flask import Flask, jsonify, request
from flask_cors import CORS  
import json
from text_summary import summarizer 

app = Flask(__name__)
CORS(app) 

# Load initial jobs data from jobs.json
with open('jobs.json', 'r') as f:
    jobs = json.load(f)

@app.route('/analyze', methods=['POST'])
def analyze():
    if request.method == 'POST':
        try:
            job_data = request.json
            rawtext = job_data.get('description', '')  
            summary = summarizer(rawtext)[0] 
            
            # Add summary to job data
            job_data['summary'] = summary
            
            # Generate unique ID for new job
            job_id = len(jobs) + 1
            job_data['id'] = job_id  # Convert to integer
            
            
            jobs.append(job_data)
            
            # Save updated jobs list to jobs.json
            with open('jobs.json', 'w') as f:
                json.dump(jobs, f, indent=2)
            
            return jsonify({'message': 'Job added successfully!', 'job': job_data}), 200
        except Exception as e:
            print(f"Error in analyze route: {str(e)}")  
            return jsonify({'error': 'Internal server error'}), 500
    else:
        return "Method not allowed", 405

if __name__ == "__main__":
    app.run(debug=True)
