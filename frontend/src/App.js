import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart from './pages/Chart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
