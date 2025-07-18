import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/navbar'
import Sidebar from './components/common/sidebar'
import { MeetingRoom } from './pages/meeting-room'

function App() {

  return (
    <>
      <Navbar />
      <main className="flex">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<MeetingRoom/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
