import React from 'react';
import FlashcardList from './components/FlashcardList';
import FlashcardAdmin from './components/FlashcardAdmin';
import EditCard from './components/EditCard';
import AddCard from './components/AddCard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add" element={<AddCard />} />
          <Route path="/edit" element={<EditCard />} />
          <Route path="/" element={<FlashcardList />} />
          <Route path="/admin" element={<FlashcardAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
