import {ArrowPathIcon} from "@heroicons/react/20/solid";

function LanguageButton(props){
    const language = props.result.general.language

    async function fetchLanguage(language){
        const req = await fetch('/api/content?language='+language);
        const content = await req.json();
        if (req.status !== 200){
            console.log("Something weird happened status code :" + req.status)
            return null
        }
        else{
            return props.setResult(content.result);
        }
    }
    const handleClick = () => {
        const newLanguage = language === 'EN' ? 'FR' : 'EN'
        document.cookie = `currentLanguage=${newLanguage};path=/`;
        fetchLanguage(newLanguage).then(r =>  {
            if (r){
               props.setResult(r)
            }
        })
    }
    return (
        <button onClick={handleClick} className="font-semibold flex bg-secondary text-text-main px-2 py-1 rounded-xl border border-1g dark:border-gray-500 hover:dark:border-gray-400 transition ease-in-out duration-300 items-center">
            <ArrowPathIcon className="h-5 w-5 mr-2"/>
            {language === 'EN' ? 'FR' : 'EN'}
        </button>
    )
}
export default LanguageButton
