import React from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignUp from './SignUp';
import LogIn from './LogIn';
// import AddCar from './AddCar';

const NavBar = () => {
  return (
    <nav className='d-flex align-items-center position-sticky top-0 z-3  text-light justify-content-between' style={{ backgroundColor: "#1D2023" }}>
      <div className="" style={{ width: "16%" }}><Link><img src="img/image3.png" className='w-100' alt="" /></Link></div>
      <div className="d-flex gap-4 align-items-center">
        <Link className='text-decoration-none text-light'>Home</Link>
        <Link className='text-decoration-none text-light'>About</Link>
        <NavDropdown title="Categories" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
        <Link className='text-decoration-none text-light'>Contact</Link>
      </div>
      <div className=" d-flex gap-2 justify-content-center" style={{ width: "20%" }}>
        <SignUp />
        <LogIn />
        {/* <AddCar/> */}
      </div>
    </nav>
  )
}

export default NavBar
