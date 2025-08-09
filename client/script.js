// Function to handle the chat request when the "Ask" button is clicked
async function getResponse() {
    // Get references to the HTML elements by their IDs
    const promptInput = document.getElementById('prompt');
    const responseDisplay = document.getElementById('response');
    const askButton = document.querySelector('button'); // Selects the first button element

    // Get the user's message from the textarea and remove any leading/trailing whitespace
    const message = promptInput.value.trim();

    // Basic client-side validation: Check if the message is empty
    if (!message) {
        responseDisplay.textContent = "Please enter a message before asking!";
        responseDisplay.style.color = 'orange'; // Set text color to orange for a warning
        return; // Stop the function execution if the message is empty
    }

    // Clear any previous response text and show a loading indicator
    responseDisplay.textContent = "Thinking...";
    responseDisplay.style.color = '#fff'; // Reset text color to white (assuming a dark background from styles.css)
    askButton.disabled = true; // Disable the button to prevent multiple submissions while waiting

    try {
        // Make a POST request to your backend server's /chat endpoint
        // Ensure 'http://localhost:5000' matches the address and port your backend is running on
        const apiResponse = await fetch('http://localhost:5000/chat', {
            method: 'POST', // Use the POST HTTP method
            headers: {
                'Content-Type': 'application/json', // Inform the server that we are sending JSON data
            },
            body: JSON.stringify({ message: message }), // Convert the message object into a JSON string
        });

        // Check if the HTTP response status is NOT OK (i.e., 4xx or 5xx)
        if (!apiResponse.ok) {
            // Parse the error response from the server to get detailed error information
            const errorData = await apiResponse.json();
            // Throw an error with a message from the server or a generic status
            throw new Error(errorData.error || `Server error: ${apiResponse.status}`);
        }

        // Parse the successful JSON response from the server
        const data = await apiResponse.json();

        // Display the AI's reply content in the preformatted text area
        responseDisplay.textContent = data.reply;
        responseDisplay.style.color = '#fff'; // Reset text color to white for success

    } catch (error) {
        // Catch any errors that occur during the fetch operation (e.g., network issues, server errors)
        console.error("Error fetching AI response:", error); // Log the error to the console for debugging
        responseDisplay.textContent = `Error: ${error.message}. Please try again.`; // Display a user-friendly error message
        responseDisplay.style.color = 'red'; // Set text color to red to indicate an error
    } finally {
        // This block will always execute, whether the try block succeeded or a catch block was triggered
        askButton.disabled = false; // Re-enable the button so the user can try again
    }
}

// Add an event listener to the entire document that fires when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt');
    // Add a keydown event listener to the prompt textarea
    promptInput.addEventListener('keydown', (event) => {
        // Check if the pressed key is 'Enter' AND the 'Shift' key is NOT pressed
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent the default action of the Enter key (e.g., creating a new line in the textarea)
            getResponse(); // Call the getResponse function to send the message
        }
    });
});
