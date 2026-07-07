// import React from 'react'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import NavBar from './Components/NavBar'
// import Profile from './Components/Profile'
// import Carousel from './Components/Carasoul'
// import Search from './Components/Search'
// import Categories from './Components/Category'
// import CarByCategory from './Components/CarByCategory'
// import CarBoardMain from './Components/CarBoardMain'
// import AboutPage from './Components/AboutPage'
// import ContactPage from './Components/ContactPage'
// import Footer from './Components/Footer'

// const App = () => {
//   const location = useLocation();

//   const isHomePage = location.pathname === '/';
//   const isCategoryPage = location.pathname.startsWith('/cars/category');

//   // Show Carousel + Search on home AND category pages
//   const showCarouselAndSearch = isHomePage || isCategoryPage;

//   // Show CarBoardMain on home AND category pages too — nothing hidden
//   const showCarBoardMain = isHomePage || isCategoryPage;
//   const isProfilePage = location.pathname.startsWith('/profile');

//   return (
//     <div>
//       <NavBar />

//       {showCarouselAndSearch && (
//         <>
//           <Carousel />
//           {/* <Search /> */}
//         </>
//       )}

//       {/* <Routes>
//         <Route path="/" element={<Categories />} />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cars/category/:category" element={<CarByCategory />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes> */}


//       <Routes>
//         <Route path="/" element={<Categories />} />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cars/category/:category" element={<CarByCategory />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>

//       {/* Search bar after Categories (Home page only) */}
//       {isHomePage && <Search />}

//       {showCarBoardMain && <CarBoardMain />}
//       {!isProfilePage && < Footer />}
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Profile from './Components/Profile'
import Carousel from './Components/Carasoul'
import Search from './Components/Search'
import Categories from './Components/Category'
import CarByCategory from './Components/CarByCategory'
import CarBoardMain from './Components/CarBoardMain'
import AboutPage from './Components/AboutPage'
import ContactPage from './Components/ContactPage'
import Footer from './Components/Footer'
import ShowAllCars from './Components/ShowAllCars'
// import AllCars from './Pages/AllCars'

const App = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isCategoryPage = location.pathname.startsWith('/cars/category');

  // Show Carousel + Search on home AND category pages
  const showCarouselAndSearch = isHomePage || isCategoryPage;

  // Show CarBoardMain on home AND category pages
  const showCarBoardMain = isHomePage || isCategoryPage;

  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div>
      <NavBar />

      {showCarouselAndSearch && (
        <>
          <Carousel />
          {/* <Search /> */}
        </>
      )}

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars/category/:category" element={<CarByCategory />} />
        <Route path="/cars" element={<ShowAllCars/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Search bar after Categories (Home page only) */}
      {isHomePage && <Search />}

      {/* Home & Category Pages */}
      {showCarBoardMain && (
        <CarBoardMain showAll={false} />
      )}

      {!isProfilePage && <Footer />}
    </div>
  )
}

export default App