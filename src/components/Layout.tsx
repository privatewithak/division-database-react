import { BASE_STYLES } from "./data/themes"



export default function Layout({ mode }: { mode: 'CCA' | 'OTA' }) {

    return (
        <>
            <main className="col-span-12 md:col-span-9 lg:col-span-10 min-h-full max-w-9/10 mx-auto">
                <div className={'rounded-lg border border-white/10 bg-white/10 backdrop-blur-xl py-4 mt-2' + ' ' + BASE_STYLES[mode]}>
                    <div className="text-white text-2xl font-mono text-center after:content-[''] after:block after:w-full after:h-0.75 after:bg-gray-500/40 after:mt-2">
                        <h3>Dashboard</h3>
            </div>
        </div>
        </main>
        </>
    )
}