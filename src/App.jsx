// // // import React from 'react'
// // // import NavBar from './Components/NavBar'
// // // import { Route, Routes } from 'react-router-dom'
// // // import Profile from './Components/Profile'
// // // import Carousel from './Components/Carasoul'
// // // const App = () => {
// // //   return (
// // //     <div>
// // //       <NavBar />
// // //       <Routes>
// // //         <Route path="/profile/:id" element={<Profile />} />
// // //         <Route path="/profile" element={<Profile />} />
// // //       </Routes>
// // //       <Carousel />
// // //     </div>
// // //   )
// // // }

// // // export default App
// // import React from 'react'
// // import NavBar from './Components/NavBar'
// // import { Route, Routes, useLocation } from 'react-router-dom'
// // import Profile from './Components/Profile'
// // import Carousel from './Components/Carasoul'
// // import Search from './Components/Search'
// // import Categories from './Components/Category'
// // import CarByCategory from './Components/CarByCategory'
// // // import CarsByCategory from './Components/CarByCategory'

// // const App = () => {
// //   const location = useLocation();
// //   const isProfilePage = location.pathname.startsWith('/profile');

// //   return (
// //     <div>
// //       <NavBar />
// //       <Routes>
// //         <Route path="/profile/:id" element={<Profile />} />
// //         <Route path="/profile" element={<Profile />} />
// //       </Routes>
// //       {!isProfilePage && <Carousel />}
// //       {!isProfilePage && <Search />}
// //       {!isProfilePage && <Categories />}
// //       <Routes>
// //         <Route path='/cars/category/:category' element={<CarByCategory />} />
// //       </Routes>
// //     </div>
// //   )
// // }

// // export default App


// import React from 'react'
// import NavBar from './Components/NavBar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Profile from './Components/Profile'
// import Carousel from './Components/Carasoul'
// import Search from './Components/Search'
// import Categories from './Components/Category'
// import CarByCategory from './Components/CarByCategory'

// // This is your "home page" — combines Carousel + Search + Categories
// const Home = () => (
//   <>
//     <Carousel />
//     <Search />
//     <Categories />
//   </>
// );

// const App = () => {
//   return (
//     <div>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/profile/:id" element={<Profile />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cars/category/:category" element={<CarByCategory />} />
//       </Routes>
//     </div>
//   )
// }

// export default App


import React from 'react'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Profile from './Components/Profile'
import Carousel from './Components/Carasoul'
import Search from './Components/Search'
import Categories from './Components/Category'
import CarByCategory from './Components/CarByCategory'

const App = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <Search />

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars/category/:category" element={<CarByCategory />} />
      </Routes>
    </div>
  )
}

export default App