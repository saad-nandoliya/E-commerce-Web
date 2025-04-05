import './App.css';
import HomeRoutes from './routes/homeRouets/homeRoutes';
import DashboaedRoutes from './routes/dashboardRoutes/dashboardRoutes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="/admin/*" element={<DashboaedRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
