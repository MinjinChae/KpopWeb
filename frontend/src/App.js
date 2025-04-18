import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Chart from './pages/Chart';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
