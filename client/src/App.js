import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import PreAssessmentForm from './components/PreAssessmentForm';
import './index.css';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<PreAssessmentForm />} />
      </Routes>
    </Router>
  );
}


export default App;
