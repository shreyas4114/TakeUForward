import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Flashcard.css';

const base_url = import.meta.env.VITE_BASE_URL;

function AddCard() {
  
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${base_url}:8080/api/v1/admin/flashcards`, { question, answer })
      .then(response => {
        alert('Flashcard added successfully');  
        navigate('/admin'); // Navigate back to admin page or wherever you want
      })
      .catch(error => {
        console.error('Error adding flashcard:', error);
        alert('Failed to add flashcard');
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4">Add New Question</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700">Question</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-gray-700">Answer</label>
            <input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
