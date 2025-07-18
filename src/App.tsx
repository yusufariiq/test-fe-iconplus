import './App.css'
import Navbar from './components/common/navbar'
import Sidebar from './components/common/sidebar'
import { MeetingRoom } from './pages/meeting-room'

function App() {

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar/>
        <MeetingRoom/>
      </div>
    </>
  )
}

export default App
