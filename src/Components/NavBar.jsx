import Dropdown from 'react-bootstrap/Dropdown';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { UserContext } from '../Context/UserContext';
// import AddCar from './AddCar';

const NavBar = () => {
  const { user, loggedIn, logout, current } = useContext(UserContext);
  return (


    <nav className='d-flex align-items-center position-sticky top-0 z-3  text-light justify-content-between' style={{ backgroundColor: "#1D2023", borderBottom: "2px solid white" }}>
      <div className="p-2" style={{ width: "16%" }}>
        <Link to="/">
          <img src="/img/image3.png" className='w-100' alt="logo" />
        </Link>
      </div>
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
      {loggedIn ? (
        <div className="p-2 d-flex gap-2 justify-content-start" style={{ width: "20%" }}>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="profile-dropdown"
              className="navtheme-avatar-toggle"
              bsPrefix="custom-toggle"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={current?.image ? `http://localhost:8080/${current.image}` : "https://picsum.photos/200/300"}
                  alt="Profile"
                  className="navtheme-avatar-img"
                />
                {current.fullname || "My Account"}
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="navtheme-dropdown-menu">

              {/* <Dropdown.Divider className="navtheme-dropdown-divider" /> */}

              <Dropdown.Item
                as={Link}
                to={`/profile/${current?._id || current?.id}`}
                className="navtheme-dropdown-item"
              >
                Profile
              </Dropdown.Item>
              {/* <Dropdown.Item className="navtheme-dropdown-item" href="/settings">
                Settings
              </Dropdown.Item> */}
              <Dropdown.Divider className="navtheme-dropdown-divider" />
              <Dropdown.Item
                className="navtheme-dropdown-item navtheme-logout"
                onClick={logout}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <div className="p-2 d-flex gap-2 justify-content-center" style={{ width: "20%" }}>
          <SignUp />
          <LogIn />
        </div>
      )}

      <style>{`
                .navtheme-avatar-toggle {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                .navtheme-avatar-toggle::after {
                    display: none; /* hides default bootstrap caret */
                }
                .navtheme-avatar-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid rgba(255,255,255,0.5);
                    transition: border-color 0.2s ease;
                }
                .navtheme-avatar-img:hover {
                    border-color: #f1f1f1;
                }

                .navtheme-dropdown-menu {
                    background-color: #1D2023;
                    border: 1px solid rgba(255,255,255,0.3);
                    font-family: monospace;
                    min-width: 180px;
                }
                .navtheme-dropdown-item {
                    color: #f1f1f1;
                }
                .navtheme-dropdown-item:hover,
                .navtheme-dropdown-item:focus {
                    background-color: rgba(255,255,255,0.1);
                    color: #f1f1f1;
                }
                .navtheme-dropdown-item:disabled,
                .navtheme-dropdown-item.disabled {
                    color: rgba(255,255,255,0.5);
                }
                .navtheme-dropdown-divider {
                    border-top: 1px solid rgba(255,255,255,0.2);
                }
                .navtheme-logout {
                    color: #ff8a8a;
                }
                .navtheme-logout:hover,
                .navtheme-logout:focus {
                    background-color: rgba(255,138,138,0.15);
                    color: #ff8a8a;
                }
            `}</style>

    </nav>
  )
}

export default NavBar
