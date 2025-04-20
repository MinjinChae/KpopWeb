import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Chart from './pages/Chart';
import Navbar from './components/Navbar';
import News from './pages/News';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<News/>}/>
            <Route path="/chart" element={<Chart/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
