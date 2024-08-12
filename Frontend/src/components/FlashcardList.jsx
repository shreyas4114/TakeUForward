import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Flashcard.css';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/user/flashcards')
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

  if (flashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-4 left-4 bg-yellow-500 text-white py-2 px-4 rounded"
      >
        Admin
      </button>

      <div className="flex flex-col items-center">
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

export default FlashcardList;
