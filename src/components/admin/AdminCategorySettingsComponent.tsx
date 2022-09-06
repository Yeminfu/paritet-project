import React, {ReactNode, useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './AdminCategorySettingsComponent.scss'
import Fetcher from "../../Fetcher/Fetcher";
const slugify = require('slugify')

interface Props{
    children?: ReactNode;
    onCategorySave: any;
    parentId: number | null;
    editingCategory: any;
    onCancelEdit: any;
    onError?: any;
}

export default function AdminCategorySettingsComponent({children, onCategorySave, parentId, editingCategory, onCancelEdit, onError}: Props){

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [parent, setParent] = useState(parentId)
    const [hasChildren, setHasChildren] = useState(false)

    const fetcher = new Fetcher()

    const titleInput = document.getElementById('titleInput')
    const slugInput = document.getElementById('slugInput')
    const descInput = document.getElementById('descInput')

    useEffect(() => {
        console.log("UE => PARENT ID:", parentId)
        console.log("UE => CATEGORY:", editingCategory)
        if(editingCategory !== null){

            if(titleInput){
                setTitle(editingCategory?.title)
                titleInput.innerHTML = editingCategory?.title
            }
            if(slugInput){
                setSlug(editingCategory?.slug)
                slugInput.innerHTML = editingCategory?.slug
            }
            if(descInput){
                setDescription(editingCategory?.description)
                descInput.innerHTML = editingCategory?.description
            }
            setHasChildren(editingCategory?.has_children)
        }
    }, [parentId, editingCategory])

    const onTitleInputChanged = (event: any) => {
        const element = event.currentTarget as HTMLInputElement
        const value = element.value
        setTitle(value)
        if(slugInput){
            const slugged = slugify(value, '_').toLowerCase()
            setSlug(slugged)
            slugInput.innerHTML = slugged
        }
    }
    const onSlugInputChanged = (event: any) => {
        const element = event.currentTarget as HTMLInputElement
        const value = element.value
        setSlug(value)
    }
    const onDescInputChanged = (event: any) => {
        const element = event.currentTarget as HTMLInputElement
        const value = element.value
        setDescription(value)
    }

    const saveCategory = async () => {
        if(title.length === 0 || slug.length === 0){
            console.log("EMPTY")
            onError("Поля \"Название\" и \"Ярлык\" не должны быть пустыми")
        }
        else{
            const res = editingCategory !== null
                ? await fetcher.editForumCategory({id: editingCategory.id, title: title, slug: slug, parent: parentId, description: description, hasChildren: hasChildren})
                : await fetcher.setNewForumCategory({title: title, slug: slug, parent: parentId, description: description, hasChildren: hasChildren})
            console.log("FRONT: SAVE FORUM CAT RESULT ->", res.data)
            if(res.data === "SUCCESSFUL"){
                setTitle('')
                setSlug('')
                setDescription('')
                setHasChildren(false)
                onCategorySave()
            }
        }

    }

    const editCancel = () => {
        setTitle('')
        setSlug('')
        setDescription('')
        setHasChildren(false)
        onCancelEdit()
    }

    return(
        <div className={'settings-segment'}>
            <div className={'setting-description'}>
                Здесь вы можете упралять категориями форума.
            </div>
            <div className={'action'}>Добавить категорию</div>
            <div className={'title'}>
                <div className="form-label">Название</div>
                <input type="text" className="form-control" id="titleInput" value={title} onChange={onTitleInputChanged}/>
                <div className="form-label-description">
                    Название определяет как элемент будет отображаться на сайте.
                </div>
            </div>
            <div className={'slug'}>
                <div className="form-label">Ярлык</div>
                <input type="text" className="form-control" id="slugInput" value={slug} onChange={onSlugInputChanged}/>
                <div className="form-label-description">
                    Ярлык - это вариант названия подходящий для URL. Обычно содержит только латинские буквы в нижнем регистре, цифры и дефисы.
                </div>
            </div>
            {/*<div className={'parent-category'}>
                <div className="form-label">Родительская категория</div>
                <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Нет
                    </button>
                    <ul className="dropdown-menu">
                        <li><div className="dropdown-item">Action</div></li>
                        <li><div className="dropdown-item">Another action</div></li>
                        <li><div className="dropdown-item">Something else here</div></li>
                    </ul>
                </div>
                <div className="form-label-description">
                    Назначьте родительский элемент для создания иерархии.
                </div>
            </div>*/}
            <div className={'category-description'}>
                <div className="form-label">Описание</div>
                <textarea className="form-control" id="descInput" value={description} onChange={onDescInputChanged}/>
                <div className="form-label-description">
                    Описание по-умолчанию не отображается, однако некоторые темы могут его показывать.
                </div>
            </div>
            {/*<div className={'view-type'}>
                <div className="form-label">Тип отображения</div>
                <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        По-умолчанию
                    </button>
                    <ul className="dropdown-menu">
                        <li><div className="dropdown-item">Action</div></li>
                        <li><div className="dropdown-item">Another action</div></li>
                        <li><div className="dropdown-item">Something else here</div></li>
                    </ul>
                </div>
            </div>*/}
            <div className={'has-children'}>
                <div className="form-check">
                    <input className="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                           checked={hasChildren}
                           onChange={(event) => {setHasChildren(event.target.checked)}}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Родительская категория
                        </label>
                </div>
            </div>
            <div className={'thumbnail'}>
                <div className="form-label">Миниатюра</div>

            </div>
            <div className={'buttons-container'}>
                {editingCategory !== null ? <button type="button" className="btn" onClick={editCancel} style={{marginRight: '8px'}}>Отмена</button> : null}
                <button type="button" className="btn btn-primary" onClick={saveCategory}>Сохранить</button>
            </div>

        </div>
    )
}