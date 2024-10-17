from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
import google.generativeai as genai
  # Your API Key
# Load environment variables from a .env file
load_dotenv()

API_KEY = os.getenv('API_KEY')

genai.configure(api_key=API_KEY)

app = Flask(__name__)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyse', methods=['POST'])
def diagnose():
    try:
        # Parse the incoming JSON data
        data = request.json
        input = data.get('input')
      

        if not input:
            return jsonify({'error': 'Missing input information'}), 400

        # Construct the input for the model
        ai_input = f"Analyze the sentiment of the following input: {input}; Give an inference on the sentiment of the input."
        #print("sent to ai")
        # Call the model to generate a response
        response = model.generate_content(ai_input)
        #print(response)
        # Ensure that the model response is in a proper format
        return jsonify({'Analysis': response.text}), 200

    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
