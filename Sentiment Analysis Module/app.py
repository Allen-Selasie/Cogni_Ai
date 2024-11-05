from flask import Flask, request, jsonify, render_template
import os
from dotenv import load_dotenv
import google.generativeai as genai
import re

# Load environment variables from a .env file
load_dotenv()

API_KEY = os.getenv('API_KEY')

genai.configure(api_key=API_KEY)

app = Flask(__name__)
model = genai.GenerativeModel('gemini-1.5-flash-8b')





@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyse', methods=['POST'])
def diagnose():
    try:
        # Parse the incoming JSON data
        data = request.json
        input = data.get('input')
        #print(input)

        if not input:
            return jsonify({'error': 'Missing input information'}), 400

        # Construct the input for the model
        ai_input = f"Analyze the sentiment of the following input and Give an inference and general comments as well as the intent on the sentiment of the input: \n{input}; .generate the reponse in html format.don't do anything like , just generate the html no head or body tags just the required ones"
        
        # Call the model to generate a response
        response = model.generate_content(ai_input)


        # Remove Markdown syntax for code blocks (````html```` and single backticks)
        cleaned_response = re.sub(r'```html\s*|```|\s*`', '', response.text).strip()

        #print(response.text)
        # Ensure that the model response is in a proper format
        return jsonify({'Analysis': cleaned_response}), 200

    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
