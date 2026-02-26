import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from '@/components/AppShell'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import TrucksYard from '@/pages/TrucksYard'
import Yard from '@/pages/Yard'
import Tasks from '@/pages/Tasks'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="main" element={<Home />} />
          <Route path="trucks/shop" element={<Shop />} />
          <Route path="trucks/yard" element={<TrucksYard />} />
          <Route path="referrals" element={<Yard />} />
          <Route path="missions" element={<Tasks />} />
        </Route>
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
