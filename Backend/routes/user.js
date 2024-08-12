const express = require('express');
const router = express.Router();
const {db} = require("../db");

router.get('/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        res.json(result);
    });
})

module.exports = router;