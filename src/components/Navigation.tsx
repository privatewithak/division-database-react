import React from 'react';
import { useState } from 'react';
import Button from './reusables/Button';
import CCA from '../assets/CCA.webp'
import OTA from '../assets/OTA.webp'
import { cx } from './data/themes';
import type {Mode} from './data/themes'
import { AnimatePresence, motion } from 'framer-motion'
import mockData from './data/layoutMock';

interface CardProps {
  children: React.ReactNode;
    className?: string;
    currentMode?: string;
}

function Card({ children, className = "", }: CardProps) {
  const baseClasses = "bg-white/8 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] min-h-1/10 rounded-2xl w-7/10 p-4 ml-10 mt-4 text-center font-mono text-white";
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}



function Navigation({mode, setMode}: {mode: Mode, setMode: React.Dispatch<React.SetStateAction<'CCA' | 'OTA'>>}) {
  
  type Section = "Divisions" | "Search" | "Timeline";

  const [active, setActive] = useState<Section>("Divisions");


  const divisionsAll = new Set(mockData.map((u) => u.division)).size;

const activeStyles =
  mode === "CCA"
    ? "outline-blue-400/50 bg-blue-500/10"
    : "outline-red-400/50 bg-red-500/10";

    const useSwitch = () => {
        if (mode === 'CCA') {
        setMode('OTA')
        } else setMode('CCA')
    }

    return (
        <div className="min-h-screen w-2/10 flex">
        <aside className="min-h-screen w-8/10 sticky top-0 gap-2 bg-white/8 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
          {mode === 'CCA' ? (
            <Card className='mx-auto mt-4 transition-opacity duration-300'>
              <motion.img key='cca' src={CCA} className='w-24 h-24 mx-auto rounded-full shadow-[0px_4px_42px_2px_rgba(59,130,246,0.5)]'
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              />
              </Card>
          ) : (
              
              <Card>
                <motion.img src={OTA} className='w-24 h-24 mx-auto rounded-full shadow-[0px_4px_42px_2px_#d13434]'
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
                />
              </Card>
        )}
                <Card className='text-2xl'>
                    <h1 className="mt-3">Division Database</h1>
                    <p className="text-white/15 text-[9px] mt-1">made by privatewithak. a fork of r-surrected/division-database</p>
          </Card>
          
          <Card>
      
<Button 
  onClick={useSwitch} 
              className='text-lg'
              mode={mode}
>
  Mode: <AnimatePresence mode='popLayout' initial={false}><motion.span key={mode} initial={{opacity: 0, y: 6, filter: 'saturate(0.7) contrast(0.95)'}} animate={{opacity: 1, y: 0, filter: 'saturate(1) contrast(1)'}} exit={{opacity: 0, y: -6}} transition={{duration: 0.15}}>{mode}</motion.span></AnimatePresence>
</Button>
          </Card>
<Card className="p-4 flex flex-col gap-4">
  {(["Divisions","Search","Timeline"] as Section[]).map((s) => (
    <Button
      key={s}
      mode={mode}
      onClick={() => setActive(s)}
      className={cx(
        "w-8/10 text-left justify-start",
        active === s && `outline-3 ${activeStyles}`
      )}
    >
      {s}
    </Button>
  ))}
</Card>
          <Card className='mt-4 p-4'>
            <h2 className='text-lg'>Stats:</h2>
            <Card className='w-8/10 p-4 relative right-5'>
            <p className='text-xs'>Divisions: {divisionsAll}</p>
              <p className='text-xs'>Units: {mockData.length}</p>
              </Card>
          </Card>
            </aside>
        </div>
    )
}

export default Navigation