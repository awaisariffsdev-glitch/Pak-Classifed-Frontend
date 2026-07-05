// // // // // import React from 'react'
// // // // // import NavBar from './Components/NavBar'
// // // // // import { Route, Routes } from 'react-router-dom'
// // // // // import Profile from './Components/Profile'
// // // // // import Carousel from './Components/Carasoul'
// // // // // const App = () => {
// // // // //   return (
// // // // //     <div>
// // // // //       <NavBar />
// // // // //       <Routes>
// // // // //         <Route path="/profile/:id" element={<Profile />} />
// // // // //         <Route path="/profile" element={<Profile />} />
// // // // //       </Routes>
// // // // //       <Carousel />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default App
// // // // import React from 'react'
// // // // import NavBar from './Components/NavBar'
// // // // import { Route, Routes, useLocation } from 'react-router-dom'
// // // // import Profile from './Components/Profile'
// // // // import Carousel from './Components/Carasoul'
// // // // import Search from './Components/Search'
// // // // import Categories from './Components/Category'
// // // // import CarByCategory from './Components/CarByCategory'
// // // // // import CarsByCategory from './Components/CarByCategory'

// // // // const App = () => {
// // // //   const location = useLocation();
// // // //   const isProfilePage = location.pathname.startsWith('/profile');

// // // //   return (
// // // //     <div>
// // // //       <NavBar />
// // // //       <Routes>
// // // //         <Route path="/profile/:id" element={<Profile />} />
// // // //         <Route path="/profile" element={<Profile />} />
// // // //       </Routes>
// // // //       {!isProfilePage && <Carousel />}
// // // //       {!isProfilePage && <Search />}
// // // //       {!isProfilePage && <Categories />}
// // // //       <Routes>
// // // //         <Route path='/cars/category/:category' element={<CarByCategory />} />
// // // //       </Routes>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default App


// // // import React from 'react'
// // // import NavBar from './Components/NavBar'
// // // import { Route, Routes, useLocation } from 'react-router-dom'
// // // import Profile from './Components/Profile'
// // // import Carousel from './Components/Carasoul'
// // // import Search from './Components/Search'
// // // import Categories from './Components/Category'
// // // import CarByCategory from './Components/CarByCategory'

// // // // This is your "home page" — combines Carousel + Search + Categories
// // // const Home = () => (
// // //   <>
// // //     <Carousel />
// // //     <Search />
// // //     <Categories />
// // //   </>
// // // );

// // // const App = () => {
// // //   return (
// // //     <div>
// // //       <NavBar />
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="/profile/:id" element={<Profile />} />
// // //         <Route path="/profile" element={<Profile />} />
// // //         <Route path="/cars/category/:category" element={<CarByCategory />} />
// // //       </Routes>
// // //     </div>
// // //   )
// // // }

// // // export default App


// // // import React from 'react'
// // // import NavBar from './Components/NavBar'
// // // import { Route, Routes } from 'react-router-dom'
// // // import Profile from './Components/Profile'
// // // import Carousel from './Components/Carasoul'
// // // import Search from './Components/Search'
// // // import Categories from './Components/Category'
// // // import CarByCategory from './Components/CarByCategory'
// // // import CarBoardMain from './Components/CarBoardMain'
// // // // const location = useLocation();
// // // const isProfilePage = location.pathname.startsWith('/profile');

// // // const App = () => {
// // //   return (
// // //     <div>
// // //       <NavBar />
// // //       <Carousel />
// // //       <Search />

// // //       <Routes>
// // //         <Route path="/" element={<Categories />} />
// // //         {/* <Route path="/profile/:id" element={<Profile />} /> */}
// // //         {/* <Route path="/profile" element={<Profile />} /> */}
// // //         {!isProfilePage && <Carousel />}
// // //         {!isProfilePage && <Search />}
// // //         {!isProfilePage && <Categories />}
// // //         <Route path="/cars/category/:category" element={<CarByCategory />} />
// // //       </Routes>
// // //       <CarBoardMain />

// // //     </div>
// // //   )
// // // }

// // // export default App


// // import React from 'react'
// // import { Route, Routes, useLocation } from 'react-router-dom'
// // import NavBar from './Components/NavBar'
// // import Profile from './Components/Profile'
// // import Carousel from './Components/Carasoul'
// // import Search from './Components/Search'
// // import Categories from './Components/Category'
// // import CarByCategory from './Components/CarByCategory'
// // import CarBoardMain from './Components/CarBoardMain'
// // import AboutPage from './Components/AboutPage'
// // import ContactPage from './Components/ContactPage'

// // const App = () => {
// //   const location = useLocation();
// //   const isProfilePage = location.pathname.startsWith('/profile');

// //   return (
// //     <div>
// //       <NavBar />

// //       {!isProfilePage && (
// //         <>
// //           <Carousel />
// //           <Search />
// //         </>
// //       )}

// //       <Routes>
// //         <Route path="/" element={<Categories />} />
// //         <Route path="/profile/:id" element={<Profile />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="/cars/category/:category" element={<CarByCategory />} />
// //       </Routes>
// //       <Routes>
// //         <Route path='/about' element={<AboutPage />} />
// //         <Route path='/contact' element={<ContactPage/>} />
// //       </Routes>
// //       {!isProfilePage && <CarBoardMain />}
// //     </div>
// //   )
// // }

// // export default App



// // import React from 'react'
// // import { Route, Routes, useLocation } from 'react-router-dom'
// // import NavBar from './Components/NavBar'
// // import Profile from './Components/Profile'
// // import Carousel from './Components/Carasoul'
// // import Search from './Components/Search'
// // import Categories from './Components/Category'
// // import CarByCategory from './Components/CarByCategory'
// // import CarBoardMain from './Components/CarBoardMain'
// // import AboutPage from './Components/AboutPage'
// // import ContactPage from './Components/ContactPage'

// // const App = () => {
// //   const location = useLocation();

// //   // Only show Carousel/Search/CarBoardMain on the home page
// //   const isHomePage = location.pathname === '/';

// //   return (
// //     <div>
// //       <NavBar />

// //       {isHomePage && (
// //         <>
// //           <Carousel />
// //           <Search />
// //         </>
// //       )}

// //       <Routes>
// //         <Route path="/" element={<Categories />} />
// //         <Route path="/profile/:id" element={<Profile />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="/cars/category/:category" element={<CarByCategory />} />
// //         <Route path="/about" element={<AboutPage />} />
// //         <Route path="/contact" element={<ContactPage />} />
// //       </Routes>

// //       {isHomePage && <CarBoardMain />}
// //     </div>
// //   )
// // }

// // export default App


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

// const App = () => {
//   const location = useLocation();

//   const isHomePage = location.pathname === '/';
//   const isCategoryPage = location.pathname.startsWith('/cars/category');

//   // Carousel + Search should show on both home AND category pages
//   const showCarouselAndSearch = isHomePage || isCategoryPage;

//   return (
//     <div>
//       <NavBar />

//       {showCarouselAndSearch && <Carousel />}

//       <Routes>
//         <Route path="/" element={<Categories />} />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cars/category/:category" element={<CarByCategory />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>

//       {/* {showCarouselAndSearch && <Search />} */}

//       {isHomePage && <CarBoardMain />}
//     </div>
//   )
// }

// export default App


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

// const App = () => {
//   const location = useLocation();

//   const isHomePage = location.pathname === '/';
//   const isCategoryPage = location.pathname.startsWith('/cars/category');

//   // Carousel + Search show on both home AND category pages
//   const showCarouselAndSearch = isHomePage || isCategoryPage;

//   return (
//     <div>
//       <NavBar />

//       {showCarouselAndSearch && (
//         <>
//           <Carousel />
//           <Search />
//         </>
//       )}

//       <Routes>
//         <Route path="/" element={<Categories />} />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cars/category/:category" element={<CarByCategory />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>

//       {isHomePage && <CarBoardMain />}
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

const App = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isCategoryPage = location.pathname.startsWith('/cars/category');

  // Show Carousel + Search on home AND category pages
  const showCarouselAndSearch = isHomePage || isCategoryPage;

  // Show CarBoardMain on home AND category pages too — nothing hidden
  const showCarBoardMain = isHomePage || isCategoryPage;
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div>
      <NavBar />

      {showCarouselAndSearch && (
        <>
          <Carousel />
          <Search />
        </>
      )}

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars/category/:category" element={<CarByCategory />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {showCarBoardMain && <CarBoardMain />}
      {!isProfilePage&&< Footer />}
    </div>
  )
}

export default App