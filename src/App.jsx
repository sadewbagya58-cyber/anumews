import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-white">
        {/* Navbar placeholder */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-black tracking-tighter text-primary">ANIMEWS</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
