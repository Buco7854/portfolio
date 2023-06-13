import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageButton from "@/components/LanguageButton";

function Navbar(props){
    return(
        <header className="fixed top-0 left-0 right-0 z-50 p-5 md:p-10 mx-auto app-content-limiter bg-main">
            <div className="flex justify-between items-center">
                <div className="items-center gap-x-10 flex">
                    <img src={props.result.general['icon_uri']} className="h-10 w-10 rounded-md" alt=""/>
                    <div className="hidden md:flex gap-x-8 justify-between">
                        <Link className="text-lg font-semibold text-text-secondary hover:text-text-main" href="#home" scroll={false}> {props.result.general['home_title']}</Link>
                        <Link className="text-lg font-semibold text-text-secondary hover:text-text-main" href="#about-me" scroll={false}>{props.result.general['about_me_title']}</Link>
                        <Link className="text-lg font-semibold text-text-secondary hover:text-text-main" href="#projects" scroll={false}>{props.result.general['projects_title']}</Link>
                    </div>
                </div>
                <div className="flex my-auto  justify-center overflow-x-auto gap-x-4">
                    <LanguageButton result={props.result} setResult={props.setResult}/>
                    <DarkModeToggle/>

                </div>
            </div>
        </header>
    )
}
export default  Navbar
