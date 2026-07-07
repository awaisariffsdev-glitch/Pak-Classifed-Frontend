import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Context/UserContext.jsx';
import { UserCarProvider } from './Context/UserCarContext.jsx';
import { CarRefreshProvider } from './Context/CarRefreshContext.jsx';
import UpdateProvider from './Context/UserContextUpdate.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserProvider>
    <UserCarProvider>
      <UpdateProvider>

        <CarRefreshProvider>


          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CarRefreshProvider>
      </UpdateProvider>

    </UserCarProvider>
  </UserProvider>
  // </StrictMode>,
)
