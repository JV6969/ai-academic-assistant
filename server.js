const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// Analyze route
app.post('/analyze', (req, res) => {
    const text = req.body.text.toLowerCase();

    let assignments = [];
    let events = [];

    // Simple keyword detection
    if (text.includes("assignment")) {
        assignments.push("Assignment detected");
    }

    if (text.includes("quiz") || text.includes("test") || text.includes("exam")) {
        events.push("Exam/Quiz detected");
    }

    if (text.includes("submit") || text.includes("deadline") || text.includes("due")) {
        assignments.push("Deadline mentioned");
    }

    res.json({
        assignments,
        events
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});