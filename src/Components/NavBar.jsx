// // import Dropdown from 'react-bootstrap/Dropdown';
// // import React, { useContext } from 'react'
// // import { Link } from 'react-router-dom'
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// // import SignUp from './SignUp';
// // import LogIn from './LogIn';
// // import { UserContext } from '../Context/UserContext';
// // // import AddCar from './AddCar';

// // const NavBar = () => {
// //   const { user, loggedIn, logout, current } = useContext(UserContext);
// //   return (


// //     <nav className='d-flex align-items-center position-sticky top-0 z-3  text-light justify-content-between' style={{ backgroundColor: "#1D2023", borderBottom: "2px solid white" }}>
// //       <div className="p-2" style={{ width: "16%" }}>
// //         <Link to="/">
// //           <img src="/img/image3.png" className='w-100' alt="logo" />
// //         </Link>
// //       </div>
// //       <div className="d-flex gap-4 align-items-center">
// //         <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Home</Link>
// //         <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>About</Link>
// //         <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Sell Car</Link>
// //         <NavDropdown title="Categories" className='fw-medium font-monospace hover-effect' id="basic-nav-dropdown">
// //           <div className="d-flex">
// //             <NavDropdown.Item >SUV</NavDropdown.Item>
// //             <NavDropdown.Item >Sedan</NavDropdown.Item>
// //           </div>
// //           <div className="d-flex">
// //             <NavDropdown.Item >Crossover</NavDropdown.Item>
// //             <NavDropdown.Item >Hatchback</NavDropdown.Item>
// //           </div>
// //           <div className="d-flex">
// //             <NavDropdown.Item >Wagon</NavDropdown.Item>
// //             <NavDropdown.Item >Sports</NavDropdown.Item>
// //           </div>
// //           <div className="d-flex">
// //             <NavDropdown.Item >Hybird</NavDropdown.Item>
// //             <NavDropdown.Item >Convertible</NavDropdown.Item>
// //           </div>


// //         </NavDropdown>
// //         <Link className='text-decoration-none text-light fw-medium font-monospace hover-effect'>Contact</Link>
// //       </div>
// //       {loggedIn ? (
// //         <div className="p-2 d-flex gap-2 justify-content-start" style={{ width: "20%" }}>
// //           <Dropdown align="end">
// //             <Dropdown.Toggle
// //               as="div"
// //               id="profile-dropdown"
// //               className="navtheme-avatar-toggle"
// //               bsPrefix="custom-toggle"
// //             >
// //               <div className="d-flex align-items-center gap-3">
// //                 <img
// //                   src={current?.image ? `http://localhost:8080/${current.image}` : "https://picsum.photos/200/300"}
// //                   alt="Profile"
// //                   className="navtheme-avatar-img"
// //                 />
// //                <div className="font-monospace fw-medium"> {current.fullname || "My Account"}</div>
// //               </div>
// //             </Dropdown.Toggle>

// //             <Dropdown.Menu className="navtheme-dropdown-menu">

// //               {/* <Dropdown.Divider className="navtheme-dropdown-divider" /> */}

// //               <Dropdown.Item
// //                 as={Link}
// //                 to={`/profile/${current?._id || current?.id}`}
// //                 className="navtheme-dropdown-item"
// //               >
// //                 Profile
// //               </Dropdown.Item>
// //               {/* <Dropdown.Item className="navtheme-dropdown-item" href="/settings">
// //                 Settings
// //               </Dropdown.Item> */}
// //               <Dropdown.Divider className="navtheme-dropdown-divider" />
// //               <Dropdown.Item
// //                 className="navtheme-dropdown-item navtheme-logout"
// //                 onClick={logout}
// //               >
// //                 Logout
// //               </Dropdown.Item>
// //             </Dropdown.Menu>
// //           </Dropdown>
// //         </div>
// //       ) : (
// //         <div className="p-2 d-flex gap-2 justify-content-center" style={{ width: "20%" }}>
// //           <SignUp />
// //           <LogIn />
// //         </div>
// //       )}

// //       <style>{`
// //                 .navtheme-avatar-toggle {
// //                     cursor: pointer;
// //                     display: flex;
// //                     align-items: center;
// //                 }
// //                 .navtheme-avatar-toggle::after {
// //                     display: none; /* hides default bootstrap caret */
// //                 }
// //                 .navtheme-avatar-img {
// //                     width: 40px;
// //                     height: 40px;
// //                     border-radius: 50%;
// //                     object-fit: cover;
// //                     border: 2px solid rgba(255,255,255,0.5);
// //                     transition: border-color 0.2s ease;
// //                 }
// //                 .navtheme-avatar-img:hover {
// //                     border-color: #f1f1f1;
// //                 }

// //                 .navtheme-dropdown-menu {
// //                     background-color: #1D2023;
// //                     border: 1px solid rgba(255,255,255,0.3);
// //                     font-family: monospace;
// //                     min-width: 180px;
// //                 }
// //                 .navtheme-dropdown-item {
// //                     color: #f1f1f1;
// //                 }
// //                 .navtheme-dropdown-item:hover,
// //                 .navtheme-dropdown-item:focus {
// //                     background-color: rgba(255,255,255,0.1);
// //                     color: #f1f1f1;
// //                 }
// //                 .navtheme-dropdown-item:disabled,
// //                 .navtheme-dropdown-item.disabled {
// //                     color: rgba(255,255,255,0.5);
// //                 }
// //                 .navtheme-dropdown-divider {
// //                     border-top: 1px solid rgba(255,255,255,0.2);
// //                 }
// //                 .navtheme-logout {
// //                     color: #ff8a8a;
// //                 }
// //                 .navtheme-logout:hover,
// //                 .navtheme-logout:focus {
// //                     background-color: rgba(255,138,138,0.15);
// //                     color: #ff8a8a;
// //                 }
// //             `}</style>

// //     </nav>
// //   )
// // }

// // export default NavBar

// Navigation bar — responsive navbar with brand logo, links (Home/About/Sell Car/Categories/Contact), auth buttons, and profile dropdown
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AddCarModal from './AddCarModel';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { UserContext } from '../Context/UserContext';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const NavBar = () => {
  const { loggedIn, logout, current } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const showToast = (message, variant = "success") => setToast({ show: true, message, variant });


  const closeExpand = () => setExpanded(false);


  const handleSellCar = () => {
    if (!loggedIn) {
      showToast("First Login to Sell Car")
      return
    };
    setShowAddCar(true);
    closeExpand(true)


  }
  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
      className="navtheme-navbar"
      sticky="top"
    >
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/" onClick={closeExpand} className="navtheme-brand">
          <img src="/img/image3.png" alt="logo" className="navtheme-logo" />
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          {loggedIn ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                id="profile-dropdown"
                className="navtheme-avatar-toggle"
                bsPrefix="custom-toggle"
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={current?.image ? `http://localhost:8080/${current.image}` : "https://picsum.photos/200/300"}
                    alt="Profile"
                    className="navtheme-avatar-img"
                  />
                  {/* <span className="font-monospace fw-medium text-light">
                    {current?.fullname || "My Account"}
                  </span> */}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navtheme-dropdown-menu">
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${current?._id || current?.id}`}
                  className="navtheme-dropdown-item"
                  onClick={closeExpand}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider className="navtheme-dropdown-divider" />
                <Dropdown.Item
                  className="navtheme-dropdown-item navtheme-logout"
                  onClick={() => { logout(); closeExpand(); }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-2 navtheme-auth-btns">
              <SignUp onAuthSuccess={closeExpand} />
              <LogIn onAuthSuccess={closeExpand} />
            </div>
          )}

          <Navbar.Toggle aria-controls="main-navbar-collapse" className="navtheme-toggle" />
        </div>

        <Navbar.Collapse id="main-navbar-collapse" className="order-lg-2">
          <Nav className="mx-lg-auto gap-lg-4 gap-2 align-items-lg-center">
            <Link as={Link} to="/" onClick={closeExpand} className="navtheme-link hover-effect">Home</Link>
            <Link to="/about" onClick={closeExpand} className="navtheme-link hover-effect">About</Link>
            <Link onClick={handleSellCar} className="navtheme-link hover-effect">Sell Car</Link>
            <AddCarModal show={showAddCar} onHide={() => setShowAddCar(false)} />

            {/* <NavDropdown title="Categories" className="fw-medium font-monospace hover-effect" id="categories-dropdown">
              <div className="d-flex ">
                {["SUV", "Sedan", "Crossover", "Hatchback", "Wagon", "Sports", "Hybrid", "Convertible"].map((cat) => (
                  <NavDropdown.Item key={cat} onClick={closeExpand} className="navtheme-dropdown-item w-50">
                    {cat}
                  </NavDropdown.Item>
                ))}
              </div>
            </NavDropdown> */}

            {/* <NavDropdown title="Categories" className='fw-medium font-monospace hover-effect' id="basic-nav-dropdown"> */}
            <NavDropdown
              title={<span className="navtheme-link hover-effect">Categories</span>}
              id="categories-dropdown"
            >
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

            <Link to="/contact" onClick={closeExpand} className="navtheme-link hover-effect">Contact</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
        <Toast
          onClose={() => setToast((t) => ({ ...t, show: false }))}
          show={toast.show}
          delay={2500}
          autohide
          className={`navtheme-toast navtheme-toast-${toast.variant}`}
        >
          <Toast.Header closeVariant="white">
            <strong className="me-auto">{toast.variant === "success" ? "Success" : "Error"}</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <style>{`
        .navtheme-navbar {
          background-color: #1D2023 !important;
          border-bottom: 1px solid white;
          z-index: 1030;
        }
        .navtheme-brand {
          padding: 0;
        }
        .navtheme-logo {
          height: 36px;
          width: auto;
          object-fit: contain;
        }
        .navtheme-link {
          color: #f1f1f1 !important;
          font-family: 'Exo', sans-serif;
          font-weight: 500;
          text-decoration:none
        }
        .navtheme-link:hover {
          opacity: 0.8;
        }
        .navtheme-toggle {
          border-color: rgba(255,255,255,0.5) !important;
        }
        .navtheme-toggle:focus {
          box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.2) !important;
        }
        .navtheme-toggle .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,255,255,0.85)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .navtheme-avatar-toggle {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .navtheme-avatar-toggle::after {
          display: none;
        }
        .navtheme-avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        .navtheme-username {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .navtheme-dropdown-menu {
          background-color: #1D2023;
          border: 1px solid rgba(255,255,255,0.3);
          font-family: 'Exo', sans-serif;
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

        @media (max-width: 991.98px) {
          .navtheme-auth-btns {
            flex-shrink: 0;
          }
          .navtheme-auth-btns > * {
            font-size: 13px;
          }
        }
        @media (max-width: 400px) {
          .navtheme-auth-btns > * {
            padding: 4px 10px !important;
            font-size: 12px !important;
          }
          .navtheme-logo {
            height: 28px;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default NavBar;