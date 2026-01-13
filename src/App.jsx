import { useState } from 'react';
import './index.css'; // Assuming you have some global styles here
import Calendar from './components/Calendar'; // Corrected spelling of Calendar
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Your Calendar component */}
        <Calendar />
      </div>
    </BrowserRouter>
  );
}

export default App;
