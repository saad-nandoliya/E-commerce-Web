import './App.css';
import HomeRoutes from './routes/homeRouets/homeRoutes';
import DashboaedRoutes from './routes/dashboardRoutes/dashboardRoutes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>

            <Route path="/*" element={<HomeRoutes />} />
            <Route path="/admin/*" element={<DashboaedRoutes />} />


          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
