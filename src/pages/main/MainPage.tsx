import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import DefaultTmp from "../../components/base/DefaultTmp";
import MainModuleComponent from "../../components/main/MainModuleComponent";
import Utils from "../../lib/utils";
import {$mainCoords, $newsCache, $newsCoords, setMainCoords} from "../../store/store";
import Fetcher from "../../Fetcher/Fetcher";
import NewsMiniComponent from "../../components/news/NewsMiniComponent";
import PreloaderComponent from "../../components/common/PreloaderComponent";
import newsPic from '../../assets/images/news.webp'

interface Modules {
    title: string;
    text: string;
    link: string;
    img: string;
}

interface News{
    title: string;
    slug: string;
    description: string;
    dateTime: string;
    smallImg: string;
    link: string;
}

interface NewsModel {
    id: number;
    title: string;
    slug: string;
    description: string;
    dateTime: string;
    content: [];
}

export default function MainPage(){

    const [faceModules, setFaceModules] = useState<Modules[]>([])
    const [lastNews, setLastNews] = useState<null | NewsModel[]>([])
    const [isLoaded, setIsLoaded] = useState(true)

    const fetcher = new Fetcher()
    const utils = new Utils()
    const tmpRef = useRef(null)

    useEffect(() => {

        setIsLoaded(true)

        let data = [
            {
                title: `Новости`,
                text: ``,
                link: '/news',
                img: ``,
            },
            //{
            //    title: "Наши партнёры",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/partners',
            //    img: newsPic
            //},
            //{
            //    title: "Форум",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/forum',
            //    img: newsPic
            //},
            //{
            //    title: "Муниципальные/Социальные программы",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/programs',
            //    img: newsPic
            //},
            //{
            //    title: "Проекты/Голосования",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.\n",
            //    link: '/projects',
            //    img: newsPic
            //},
            //{
            //    title: "Юриспруденция",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/jurisprudence',
            //    img: newsPic
            //},
            //{
            //    title: "ЖКХ",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/hcs',
            //    img: newsPic
            //},
            //{
            //    title: "Объявления",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/ads',
            //    img: newsPic
            //},
            //{
            //    title: "Трудоустройство",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/employment',
            //    img: newsPic
            //},
            //{
            //    title: "Частные услуги",
            //    text: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
            //    link: '/private-services',
            //    img: newsPic
            //},
        ]
        setFaceModules(data)

        async function getLast(){
            const answer = await fetcher.getLastNews()
            setLastNews(answer.data[0])
            setIsLoaded(false)
            console.log("MAIN SCROLL TO", $mainCoords.getState())
            setTimeout(() => {
                window.scroll(0, $mainCoords.getState())
            }, 0)
        }
        if(!$newsCache.getState()){
            console.log("FROM BACK")
            getLast()
        }
        else{
            console.log("FROM CACHE")
            let lastNews = $newsCache.getState()?.slice(0, 5)
            setLastNews(lastNews ? lastNews : null)
            setIsLoaded(false)
            console.log("MAIN SCROLL TO", $mainCoords.getState())
            setTimeout(() => {
                window.scroll(0, $mainCoords.getState())
            }, 0)
        }
    }, [])

    return(
        isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp getScroll={(data: number) => {setMainCoords(data)}}>
                {
                    faceModules?.map((e, index) => {
                        return (index === 0
                            ? <MainModuleComponent data={e} key={e.link} >
                                {
                                    lastNews?.map(function(n, index){
                                        return <NewsMiniComponent key={index+Math.random()+2000000} data={n}/>
                                    })
                                }
                            </MainModuleComponent>
                            : <MainModuleComponent data={e} key={e.link}/>)
                    })
                }
            </DefaultTmp>
    )
}