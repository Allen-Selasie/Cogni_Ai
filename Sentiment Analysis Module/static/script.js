document.getElementById('checkBtn').addEventListener('click', async function() {
    const symptomsInput = document.getElementById('sentiment').value;
    const input = symptomsInput.toLowerCase().split(',').map(symptom => symptom.trim());
 
    try {
        // Call the Gemmi API with the symptoms and severity
        const response = await fetch('/analyse', {  // Replace with actual API endpoint
            method: 'POST',
            headers: {
              
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input})
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            const analysis = data.Analysis || "No matching diagnosis found. Please consult a healthcare professional.";
        const loadingAnimation = document.createElement('div');
        loadingAnimation.id = 'loading';
        loadingAnimation.innerText = 'Loading...';
        document.body.appendChild(loadingAnimation);

        // Remove loading animation after analysis is done
        document.body.removeChild(loadingAnimation);
            document.getElementById('analysis').innerText = analysis;
    
        } else {
            document.getElementById('diagnosis').innerText = "An error occurred. Please try again later.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('diagnosis').innerText = "An error occurred. Please try again later.";
    }
});
