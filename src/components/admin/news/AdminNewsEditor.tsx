import React, {ReactNode, useState} from "react";
import styles from './AdminNewsEditor.module.scss'
import NewItemDropDown from "./NewItemDropDown";
import icon from '../../../assets/icons/IconChat.svg'

interface Props{
    children?: ReactNode;
}

export default function AdminNewsEditor({children}: Props){

    const [elements, setElements] = useState<JSX.Element[]>([])

    const [textAreasData, setTextAreasData] = useState<{key: number, value?: string}[]>([])
    const [imageAreasData, setImageAreasData] = useState<{key: number, value?: any}[]>([])

    const onTextAreaChanged = (key: number, value: string) => {
        textAreasData?.find(x => {
            if(x.key === key){
                x.value = value
                setTextAreasData(textAreasData)
                setTimeout(() => console.log("newold_VALUE", textAreasData.find(x => key === x.key)?.value), 100)
            }
        })
    }

    const onImageSelected = (key: number, value: any) => {
        const res = URL.createObjectURL(value.target.files[0])
        console.log(res)
        let el = document.getElementsByClassName(styles.image)
        el.item(0)?.setAttribute("src", res)

        //let img = document.createElement("img")
        //img.classList.add("obj")
        //let img = new Image()
        //img.src
        //img.file = file
        //preview.appendChild(img); // Предполагается, что "preview" это div, в котором будет отображаться содержимое.

        //var reader = new FileReader();
        //reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        //reader.readAsDataURL(file);
        imageAreasData?.find(x => {
            if(x.key === key){
                x.value = res
                setImageAreasData(imageAreasData)
                setTimeout(() => console.log("newold_VALUE", imageAreasData.find(x => key === x.key)?.value), 100)
            }
        })
    }

    const addNewElement = (index: number) => {
        switch(index){
            case 0: {
                const key = Number((Math.random()*1000000).toFixed(0))
                textAreasData?.push({key: key})
                setTextAreasData(textAreasData)
                elements.push(
                    <textarea className={styles.textArea}
                              value={textAreasData.find(x => key === x.key)?.value}
                              onChange={event => onTextAreaChanged(key, event.target.value)}
                              key={key}>
                    </textarea>
                )
                setElements([...elements])
            } break;
            case 1: {
                const key = Number((Math.random()*1000000).toFixed(0))
                imageAreasData?.push({key: key})
                setImageAreasData(imageAreasData)
                elements.push(
                    <div key={key} className={styles.imageArea}>
                        <input type="file"
                               accept="image/jpeg,image/png,image/gif"
                               value={imageAreasData.find(x => key === x.key)?.value}
                               onChange={event => onImageSelected(key, event)}>
                        </input>
                        <img className={styles.image}
                             src={imageAreasData.find(x => key === x.key)?.value
                                ? imageAreasData.find(x => key === x.key)?.value
                                : icon}
                             alt=''/>
                    </div>

                )
                setElements([...elements])
            } break;
            case 2: {

            } break;
            case 3: {

            } break;
        }
    }

    return(
        <div className={styles.adminNewsEditor}>
            <div className={styles.header}>
                Редактор новостей
            </div>
            <div className={styles.editor}>
                {/*<input className={styles.textInput}
                       value={title}
                       onChange={(event) => setTitle(event.target.value)}/>
                <textarea className={styles.textArea}
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}>
                </textarea>
                <div className={styles.imageArea}>
                    <img className={styles.image} src={'file:///' + window.loadURL(currentImage)} alt=''/>
                    <input type='file' onChange={(event) => {
                        console.log('onchange', setCurrentImage(event.target.value))

                    }}/>
                </div>
                <textarea className={styles.textArea}
                          value={article}
                          onChange={(event) => setArticle(event.target.value)}>
                </textarea>*/}
                {
                    elements.map(element => {
                        return element
                    })
                }
                <div className={styles.addNewElement}>
                    <NewItemDropDown onIndex={(index: number) => addNewElement(index)}/>
                </div>
                <button>Сохранить</button>
            </div>
        </div>
    )
}