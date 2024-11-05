document.getElementById('checkBtn').addEventListener('click', async function() {
    const symptomsInput = document.getElementById('sentiment').value;
    const input = symptomsInput.trim();

    // Create loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.id = 'loading';
    loadingAnimation.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    document.body.appendChild(loadingAnimation);

    try {
        const response = await fetch('/analyse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: input })
        });

        const data = await response.json();

        // Remove loading animation after analysis is done
        document.body.removeChild(loadingAnimation);

        if (response.ok) {
            const analysis = data.Analysis || "No matching diagnosis found. Please consult a healthcare professional.";
            document.getElementById('analysis').innerHTML = analysis;
        } else {
            document.getElementById('analysis').innerText = "An error occurred. Please try again later.";
        }
    } catch (error) {
        console.error('Error:', error);
        document.body.removeChild(loadingAnimation);
        document.getElementById('analysis').innerText = "An error occurred. Please try again later.";
    }
});
