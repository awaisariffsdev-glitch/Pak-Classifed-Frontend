import React from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignUp from './SignUp';
import LogIn from './LogIn';
// import AddCar from './AddCar';

const NavBar = () => {
  return (


    <nav className='d-flex align-items-center position-sticky top-0 z-3  text-light justify-content-between' style={{ backgroundColor: "#1D2023",borderBottom:"2px solid white" }}>
      <div className="p-2" style={{ width: "16%" }}><Link><img src="img/image3.png" className='w-100' alt="" /></Link></div>
      <div className="d-flex gap-4 align-items-center">
        <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Home</Link>
        <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>About</Link>
        <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Sell Car</Link>
        <NavDropdown title="Categories" className='fw-medium font-monospace hover-effect' id="basic-nav-dropdown">
          <div className="d-flex">
            <NavDropdown.Item >SUV</NavDropdown.Item>
            <NavDropdown.Item >Sedan</NavDropdown.Item>
          </div>
          <div className="d-flex">
            <NavDropdown.Item >Crossover</NavDropdown.Item>
            <NavDropdown.Item >Hatchback</NavDropdown.Item>
          </div>
          <div className="d-flex">
            <NavDropdown.Item >Wagon</NavDropdown.Item>
            <NavDropdown.Item >Sports</NavDropdown.Item>
          </div>
          <div className="d-flex">
            <NavDropdown.Item >Hybird</NavDropdown.Item>
            <NavDropdown.Item >Convertible</NavDropdown.Item>
          </div>
          

        </NavDropdown>
        <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Contact</Link>
      </div>
      <div className="p-2 d-flex gap-2 justify-content-center " style={{ width: "20%" }}>
        <SignUp />
        <LogIn />
        {/* <AddCar/> */}
      </div>
    </nav>
  )
}

export default NavBar
