const express = require('express');
const cors = require('cors');

const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

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
    const text = req.body.text;

    let assignments = [];
    let events = [];

    // Split into sentences
    const sentences = text.split(/[.]/);

    sentences.forEach(sentence => {
        const s = sentence.toLowerCase();

        // Assignment detection
        if (s.includes("assignment")) {
           let name = sentence.replace(/submit|by/gi, "").trim();

            // Extract date (simple regex)
            let dateMatch = sentence.match(
                /\b(\d{1,2}\s?(jan|feb|march|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*)\b/i
            );

            let date = dateMatch ? dateMatch[0] : "No date";

            assignments.push(`${name} (${date})`);
        }

        //
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        let text = "";

        if (req.file.mimetype === "application/pdf") {
            const dataBuffer = fs.readFileSync(req.file.path);
            const pdfData = await pdfParse(dataBuffer);
            text = pdfData.text;
        } else {
            // Text file
            text = fs.readFileSync(req.file.path, 'utf-8');
        }

        // Reuse your analyze logic
        const sentences = text.split(/[.]/);

        let assignments = [];
        let events = [];

        sentences.forEach(sentence => {
            const s = sentence.toLowerCase();

            if (s.includes("assignment")) {
                let dateMatch = sentence.match(
                    /\b(\d{1,2}\s?(jan|feb|march|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*)\b/i
                );

                let date = dateMatch ? dateMatch[0] : "No date";
                assignments.push(`${sentence.trim()} (${date})`);
            }

            if (s.includes("quiz") || s.includes("test") || s.includes("exam")) {
                let dateMatch = sentence.match(
                    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i
                );

                let date = dateMatch ? dateMatch[0] : "No date";
                events.push(`${sentence.trim()} (${date})`);
            }
        });

        res.json({ assignments, events });

    } catch (err) {
        res.status(500).json({ error: "Error processing file" });
    }
});
        // Event detection
        if (s.includes("quiz") || s.includes("test") || s.includes("exam")) {
            let name = sentence.trim();

            let dateMatch = sentence.match(
                /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i
            );

            let date = dateMatch ? dateMatch[0] : "No date";

            events.push(`${name} (${date})`);
        }
    });

    res.json({
        assignments,
        events
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});