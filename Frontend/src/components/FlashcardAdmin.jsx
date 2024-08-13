import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Flashcard.css';

const base_url = import.meta.env.VITE_BASE_URL;

function FlashcardListAdmin() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${base_url}:8080/api/v1/admin/flashcards`)
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this flashcard?")) {
      axios.delete(`${base_url}:8080/api/v1/admin/flashcards/${flashcards[currentIndex].id}`)
        .then(response => {
          setFlashcards(prevFlashcards => prevFlashcards.filter((_, index) => index !== currentIndex));
          setCurrentIndex(prevIndex => (prevIndex === 0 ? 0 : prevIndex - 1));
        })
        .catch(error => console.error('Error deleting flashcard:', error));
    }
  };

  if (flashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-yellow-500 text-white py-2 px-4 rounded"
      >
        User
      </button>

      <button
        onClick={() => navigate("/add")}
        className="absolute top-4 right-4 bg-yellow-500 text-white py-2 px-4 rounded"
      >
        Add Flashcard
      </button>

      <div className="flex flex-col items-center">
        {flashcards.length === 0 ? (
          <div>No Questions available</div>
        ) : (
          <div
            className={`flip-container rounded-xl overflow-hidden shadow-xl cursor-pointer w-[500px] h-[400px] ${flipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="flipper">
              <div className="front bg-gradient-to-r from-cyan-500 to-blue-500">
                {flashcards[currentIndex].question}
              </div>
              <div className="back bg-gradient-to-r from-yellow-100 to-green-300">
                {flashcards[currentIndex].answer}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col mt-4 space-y-2">
          <button
            onClick={() => navigate(`/edit?id=${flashcards[currentIndex].id}`)}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>

        <div className="absolute bottom-4 flex justify-between w-full px-4">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardListAdmin;
