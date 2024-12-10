import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context';
import { Home } from './pages/Home';
import { CreateCampaign } from './components/CreateCampaign';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCampaign />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
}

export default App;