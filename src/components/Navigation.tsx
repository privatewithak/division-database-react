import React from 'react';
import { useState } from 'react';
import Button from './reusables/Button';

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



function Navigation() {
    const [mode, setMode] = useState('CCA')

    const useSwitch = () => {
        if (mode === 'CCA') {
        setMode('OTA')
        } else setMode('CCA')
    }

    return (
        <div className="min-h-screen w-2/10 flex sticky">
            <aside className="min-h-screen w-8/10 relative flex flex-col gap-2 bg-white/8 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                <Card className='text-2xl'>
                    <h1 className="mt-3">Division Database</h1>
                    <p className="text-white/9 text-xs mt-1">made by privatewithak. a fork of r-surrected/division-database</p>
                </Card>
                <Card>
<Button 
  onClick={useSwitch} 
  className='text-lg'
>
  Mode: {mode}
</Button>
                </Card>
            </aside>
        </div>
    )
}

export default Navigation