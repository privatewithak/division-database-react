import './App.css'
import Navigation from './components/Navigation'

function App() {


  return (
    <>
      <div className='bg-[linear-gradient(135deg,#0a0a0f,#1a1a2e,#16213e)] min-h-screen min-w-screen flex overflow-hidden'>
        <Navigation />
        <div>
          <div className='text-center mt-8 text-3xl font-bold after:content-[""] after:block after:w-28/10 after:h-0.75 after:mt-2 after:bg-gray-800/40'>
            <h2 className='text-white mb-1'>Universal Union Divisional Dashboard</h2>
            <p className='text-gray-600 block text-sm font-regular text-left'>Current scope: Civil Protection and Officer Academy</p>
            </div>
        </div>
        </div>
    </>
  )
}

export default App
