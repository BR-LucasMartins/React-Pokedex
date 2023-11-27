import { Link } from 'react-router-dom';


//resources
import header_logo from '../assets/images/logos/logo-pokedex.png';
import { FaHome } from 'react-icons/fa'

function Navbar() {
  return (
    <header className='navbar'>
        <div className="navbar-logo">
        <Link to="/">
            <img src={header_logo} alt="logo pokedex" />
        </Link>
        </div>

        <div className="navbar-list-links">
          <Link to="/"> <FaHome /> Home </Link>
          <Link to="/about"> About </Link>
        </div>
    </header>
  )
}

export default Navbar