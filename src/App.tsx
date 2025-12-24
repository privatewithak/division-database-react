import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Layout from './components/Layout'

function App() {
  const [mode, setMode] = useState<'CCA' | 'OTA'>('CCA')

  return (
    <div className="bg-[linear-gradient(135deg,#0a0a0f,#1a1a2e,#16213e)] min-h-dvh w-full flex overflow-hidden">
      <Navigation mode={mode} setMode={setMode} />

      <div className="flex-1 min-w-0 overflow-hidden">
        
        <div className="w-full px-10 pt-8">
          {/* Header */}
          <div className="text-left">
            <h2 className="text-white text-3xl font-bold mb-1">
              Universal Union Divisional Dashboard
            </h2>

            <div className="h-0.75 w-[67vw] bg-gray-800/40 mt-2" />

            <p className="text-gray-600 mt-2 text-sm">
              Current scope:{' '}
              {mode === 'CCA'
                ? 'Civil Protection and Officer Academy'
                : 'Overwatch Transhuman Arm'}
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="relative mt-10 px-10">
          <div className="mx-auto w-full max-w-8xl">
            <Layout mode={mode} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
