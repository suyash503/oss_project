// C:\Users\Suyash Singh\Documents\oss_project\server\routes\aiRoutes.js

const express = require('express');
const router = express.Router();

// FIX: Import 'chatController' instead of the old, broken function.
const { chatController } = require('../controllers/aiController');

// FIX: This now correctly references the imported controller.
router.post('/chat', chatController);

module.exports = router;