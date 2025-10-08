import {NavLink} from 'react-router-dom'


function Header() {

    return (
      <div className="App">
        <header>
          <div className='logo'>
            <h1><NavLink to='/'style={({ isActive }) => {return {color: isActive ? "#212529" : "#212529", textDecoration:isActive ? "none" : "none"};}}>JSHS</NavLink></h1>
          </div>
          <nav>
            <ul>
              <li><NavLink to='/' style={({ isActive }) => {return {color: isActive ? "#fca311" : "#212529", textDecoration:isActive ? "underline dotted 4px" : ""};}}>Home</NavLink></li>
              <li><NavLink to='/Search' style={({ isActive }) => {return {color: isActive ? "#fca311" : "#212529", textDecoration:isActive ? "underline dotted 4px" : ""};}}>Search</NavLink></li>
              <li><NavLink to="/Login" style={({ isActive }) => {return {color: isActive ? "#fca311" : "#212529", textDecoration:isActive ? "underline dotted 4px" : ""};}}>Login</NavLink></li>
              <li><NavLink to="/Signup" style={({ isActive }) => {return {color: isActive ? "#fca311" : "#212529", textDecoration:isActive ? "underline dotted 4px" : ""};}}>Sign Up</NavLink></li>
            </ul>
          </nav>  
        </header>
      </div>
    )
  }
  
  export default Header