import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Recipe from './components/Recipe';

function App() {


  return (
    <>
      <Header />
      <Router>
          <Routes>
              <Route path='/recipe-book' element={<Home />} />
              <Route path='/recipe-book/list/:recipeId' element={<Recipe />} />
            </Routes>
      </Router>
    </>
  );
}

export default App;
