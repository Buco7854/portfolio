import Head from "next/head"
import pool from "lib/database";
import sleep from "../utils/sleep"
import Navbar from "@/components/Navbar";
import {useEffect, useRef, useState} from "react";
import {ArrowDownIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import parser from "accept-language-parser"
import {useTheme} from "next-themes";



async function addName(name) {
    // I am using document.getElementById again and again so that it does not expire after each render(changing language for example)
    for (let i = 0; i < name.length; i++) {
        document.getElementById("title-name").innerText = name.slice(0, i+ 1)
        await sleep(100)
    }
}

async function removeName() {
    while (document.getElementById("title-name").innerText !== "") {
        document.getElementById("title-name").innerText = document.getElementById("title-name").innerText.slice(0, -1)
        await sleep(100)
    }
}

async function writeNames(general) {
    document.getElementById("title-name").innerText = ""
    await addName(general["name"])
    await sleep(1500)
    await removeName()
    await addName(general["pseudo"])
    await sleep(1500)
    await removeName()
}

export default function Home(props) {
    let [result, setResult] = useState(props.dbResult)
    let lock = useRef(false)
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(()=>{
        if (!lock.current && result && mounted){
             const temp = async () => {
                 while (true){
                     lock.current = true
                     await writeNames(result.general)
                 }
             }
             temp().then()
        }
    },[result])
    if (!mounted) {
        return null
    }
    if (!props.dbResult){
        return(
            <div className="px-5 py-5">
                <Head>
                    <title>Something Went Wrong</title>
                    <meta name="description" content="Hi, don't hesitate to visit my portfolio."/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta property="og:site_name" content="www.grimbert.xyz"/>
                    <meta name="theme-color" content={theme === 'dark' ? '#131313':'#EBEBEB'} data-react-helmet="true"/>
                </Head>
                <div className="text-4xl text-center">Sorry, Something Went Wrong.</div>
            </div>
        )
    }
    let title = "Salut, je m'appelle "
    if(result.general.language === 'en'){
        title = "Hi, I'm "
    }
    title += result.general['name'].split(' ')[0]
    console.log(theme)
    return (
        <div className="app-content-limiter mx-auto">
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title}/>
                <meta name="description" content="Hi, don't hesitate to visit my portfolio."/>
                <link rel="icon" href={result.general['icon_uri']}/>
                <meta property="og:image" content={result.general['icon_uri']}/>
                <meta property="og:site_name" content="www.grimbert.xyz"/>
                <meta name="theme-color" content={theme === 'dark' ? '#131313':'#EBEBEB'} data-react-helmet="true"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar result={result} setResult={setResult}/>
            <div className="flex flex-col px-5 md:px-10">
                <div id="home" className="flex flex-col md:flex-row justify-center items-center md:justify-between safe-h-screen my-auto w-full">
                    <div className="hidden font-light mt-3"></div>
                    <div className="flex flex-col justify-center items-start text-3xl md:text-4xl font-bold mb-10 md:mr-10"
                         dangerouslySetInnerHTML={{__html: result.general['title']}}>
                    </div>
                    <div id="code-block-container" className="flex flex-col justify-center items-start w-full">
                        <div className="bg-secondary p-7 text-lg rounded-lg code-block mx-auto w-full">
                            <div>
                            <pre>
                                1&nbsp;&nbsp;&nbsp;&nbsp;me&nbsp;&nbsp;:=&nbsp;&nbsp;
                                <span className="font-bold">Person</span>&nbsp;&nbsp;{/* */}
                                {"{"}
                            </pre>
                                <pre>
                                2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name:&nbsp;&nbsp;&nbsp;&nbsp;{'"'}
                                    <span className="font-bold">{result.general["name"]}</span>{'"'}
                            </pre>
                                <pre>
                                3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Likes:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {'[]string{"'}<span className="font-bold">{'CODING'}</span>
                                    {'", "'}<span className="font-bold">{'READING'}</span>{'"}'}
                            </pre>
                                <pre>
                                4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {'time.Now().Date().Year() - 2003'}
                            </pre>
                                <pre>
                                5&nbsp;&nbsp;&nbsp;{/* */}
                                    {"}"}
                            </pre>
                            </div>
                        </div>
                    </div>
                    <Link href="#about-me" className="w-10 h-10 text-text-secondary absolute left-0 right-0 bottom-0 mb-10 mx-auto animate-bounce" scroll={false}>
                        <ArrowDownIcon/>
                    </Link>
                </div>
                <div id="about-me" className="flex gap-x-10 gap-y-20 flex-col md:flex-row justify-center md:justify-start items-center md:items-start pt-32 items-stretch">
                    <div className="relative sourced-image">
                        <img src={result.general['icon_uri']} className="w-full md:h-72 md:w-72 rounded-2xl" alt=""/>
                        <div
                            className="absolute bottom-5 left-5 rounded-lg bg-white transition-all translate-y-2 opacity-0 cursor-pointer">
                            {
                                result.general['icon_source'] && (
                                    <a className="p-2.5 flex flex-row items-center gap-2.5"
                                       href={result.general['icon_source']} target="_blank">
                                        <img className="object-fit rounded-full h-6 w-6" src={result.general['icon_author_profile_picture']} alt=""/>
                                        <div className="text-black text-sm leading-none font-medium">Image by {result.general['icon_author_name']}</div>
                                    </a>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col lg:mt-10 gap-y-5 flex-1 items-start grow">
                        <h1 className="text-4xl font-bold">{result.general['about_me_title']}</h1>
                        <div className="hidden">
                            <span className="text-sky-500 font-bold"></span>
                            <span className="text-purple-500 underline"></span>
                            <span className="text-orange-500 font-bold"></span>
                            <span className="text-teal-500 italic"></span>
                            <span className="text-green-500 font-bold"></span>
                            <span className="text-pink-500 underline"></span>
                        </div>
                        <p className="font-roboto text-justify" dangerouslySetInnerHTML={{__html: result.general['about_me_description']}}></p>
                    </div>
                </div>
                <div id="projects" className="flex gap-y-16 flex-col pt-32 pb-16">
                    <h1 className="text-4xl font-bold">{result.general['projects_title']}</h1>
                    <div className="grid grids-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {
                          result.projects.map((v) => (<ProjectCard info={v} key={'project-card-' + v['id']}/>))
                      }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    let result = null;
    const language = req.cookies['currentLanguage'] || parser.pick(['fr','en'], req.headers['accept-language'], {loose:true}).toLowerCase() || 'en'
    let {rows} = await pool.query('SELECT * FROM general WHERE language = $1 LIMIT 1', [language])
    if (rows.length <= 0){
        rows = (await pool.query('SELECT * FROM general WHERE language = $1 LIMIT 1', [language])).rows;
    }

    if(rows.length > 0){
        result = {}
        result.general = rows[0]
        result.projects = (await pool.query('SELECT * FROM projects WHERE not is_hidden AND language = $1 ORDER BY id DESC', [language])).rows;
    }

    return {props: {dbResult: result}};
}
