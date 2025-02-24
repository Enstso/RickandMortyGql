import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListCharacters from './components/List';
import DetailCharacter from './components/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListCharacters />} />
        <Route path="/character/:id" element={<DetailCharacter />} />
      </Routes>
    </Router>
  );
}

export default App;
