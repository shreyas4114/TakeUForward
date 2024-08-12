const express = require('express');
const router = express.Router();
const zod = require('zod');
const { db } = require("../db");

const inputBody = zod.object({
    question: zod.string(),
    answer: zod.string()
});

const updateBody = zod.object({
    question: zod.string().optional(),
    answer: zod.string().optional()
});

router.get('/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        res.json(result);
    });
});

router.post('/flashcards', (req, res) => {
    const { success } = inputBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Requirement not fullfilled"
        })
    }

    const { question, answer } = req.body;
    db.query(
        'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
        [question, answer],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send('Flashcard added');
        }
    );
});

// Get a flashcard by ID
router.get('/flashcards/:id', (req, res) => {
    const { id } = req.params;

    // Optional: Validate ID format if necessary
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Invalid flashcard ID' });
    }

    db.query('SELECT * FROM flashcards WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: 'Failed to fetch flashcard' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.json(result[0]);
    });
});

// Update a flashcard
router.put("/flashcards/:id", (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Requirement not fullfilled"
        })
    }

    const { id } = req.params;
    const { question, answer } = req.body;
    db.query(
        "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
        [question, answer, id],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({
                question,
                answer
            });
        }
    );
});

// Delete a flashcard
router.delete("/flashcards/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM flashcards WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;