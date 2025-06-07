import { Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './features/layout/Layout'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import Conductors from './pages/Conductors'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="conductors" element={<Conductors />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
