import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home, MapView, CarePoints, LostFound, Shelters } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<MapView />} />
          <Route path="care-points" element={<CarePoints />} />
          <Route path="lost-found" element={<LostFound />} />
          <Route path="shelters" element={<Shelters />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
