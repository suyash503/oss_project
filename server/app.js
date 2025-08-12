// C:\Users\Suyash Singh\Documents\oss_project\server\server.js (or you can name it app.js)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// --- Import your new router ---
const aiRoutes = require('./routes/aiRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // For development, allow all origins
app.use(express.json());

// --- Use the router ---
// All routes defined in aiRoutes.js will now be prefixed with /api
// e.g., the client's call to '/api/chat' will work.
app.use('/api', aiRoutes);

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));