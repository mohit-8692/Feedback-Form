import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmissionPage from './components/SubmissionPage';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/submission" element={<SubmissionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
