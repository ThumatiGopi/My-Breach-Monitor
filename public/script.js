document.getElementById('breachForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const resultBox = document.getElementById('result'); // Select the result box

    // Clear the result box before showing new results
    resultBox.innerHTML = '';

    try {
        const response = await fetch('/checkBreach', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput })
        });

        const result = await response.json();

        if (result.breaches) {
            // Format and display breaches in the result box
            resultBox.innerText = `Breaches found:\n${JSON.stringify(result.breaches, null, 2)}`;
        } else {
            // Display message if no breaches are found
            resultBox.innerText = result.message || 'No breaches found.';
        }
    } catch (error) {
        // Display error in the result box
        resultBox.innerText = 'Error checking breach.';
        console.error('Error:', error);
    }
});
