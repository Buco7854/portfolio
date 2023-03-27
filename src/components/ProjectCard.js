import GitHubIcon from "@/components/GitHubIcon";

export default function ProjectCard(props){
    return(
        <div className="shadow-lg border-gray-300 border dark:border-none dark:bg-secondary rounded-xl overflow-hidden w-full h-full flex flex-col justify-between">
            {
                props.info['image_uri'] && (
                    <img src={props.info['image_uri']} className="w-full h-36 object-cover" alt=""/>
                )
            }
            <div className="p-7 flex-1 flex flex-col">
                <h1 className="text-2xl mb-5 font-bold">{props.info['name']}</h1>
                <p className="text-justify">{props.info['description']}</p>
                <div className="flex flex-col justify-end flex-1">
                    <div className="gap-4 gap-y-3 mt-5 flex flex-col md:flex-row self-end w-full">
                        {
                            props.info['website_uri'] && (
                                <a href={ props.info['website_uri']} target="_blank" className="justify-center w-full text-xl bg-emerald-400 text-white rounded-md flex items-center py-1 px-2 hover:brightness-90">
                                    {props.info['language'] === 'EN' ? 'Website' : 'Site web'}
                                </a>
                            )
                        }
                        {
                            props.info['repository_uri'] && (
                                <a href={ props.info['repository_uri']} target="_blank" className="justify-center w-full text-xl bg-indigo-400 text-white rounded-md flex items-center py-1 px-2 hover:brightness-90">
                                    <GitHubIcon className={"h-6 w-6 text-white mr-2"}/>
                                    {props.info['repository_button_text'] ? props.info['repository_button_text'] : (props.info['language'] === 'EN' ? 'Repository' : 'Dépôt')}

                                </a>
                            )
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}