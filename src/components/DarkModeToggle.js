import {MoonIcon, SunIcon} from "@heroicons/react/20/solid";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import sleep from "@/utils/sleep";

function DarkModeToggle() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    },[])

    if (!mounted) {
        return null
    }

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex items-center" id="dark-mode-toggle">
             <span
                 className='inline-block h-6 w-6 transform rounded-full transition'
             >
                 {theme==='light' ? <MoonIcon className="text-black"/> : <SunIcon className="text-white"/>}
             </span>
        </button>
    )
}

export default DarkModeToggle
