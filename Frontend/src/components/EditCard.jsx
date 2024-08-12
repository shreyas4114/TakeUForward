import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function EditCard() {
  const [flashcard, setFlashcard] = useState({ question: '', answer: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const flashcardId = queryParams.get('id');

  console.log(flashcardId);
  useEffect(() => {
    // Fetch the flashcard details using the ID from the URL query parameters
    axios.get(`http://localhost:8080/api/v1/admin/flashcards/${flashcardId}`)
      .then(response => setFlashcard(response.data))
      .catch(error => console.error('Error fetching flashcard:', error));
  }, [flashcardId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlashcard(prevFlashcard => ({ ...prevFlashcard, [name]: value }));
  };

  const handleSave = () => {
    // Send the updated flashcard data to the server
    axios.put(`http://localhost:8080/api/v1/admin/flashcards/${flashcardId}`, flashcard)
      .then(() => {
        navigate('/admin'); // Navigate back to the main page or flashcard list
      })
      .catch(error => console.error('Error updating flashcard:', error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[400px] p-6 rounded-xl shadow-xl bg-white">
        <h2 className="text-2xl font-bold mb-4">Edit Flashcard</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
            Question
          </label>
          <textarea
            id="question"
            name="question"
            value={flashcard.question}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            value={flashcard.answer}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows="4"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCard;
