import {BrowserRouter , Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';

//pages
import Home from './pages/Home';
import About from './pages/About';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home></Home>}> </Route>
            <Route path='/about' element={<About> </About>}></Route>
            <Route path='/pokemons/:id' element={<PokemonDetails></PokemonDetails>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
