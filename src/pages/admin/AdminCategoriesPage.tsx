import React, {ReactNode, useEffect, useState} from "react";
import AdminCategorySettingsComponent from "../../components/admin/AdminCategorySettingsComponent";
import './AdminCategoriesPage.scss'
import {useNavigate} from "react-router-dom";
import AdminCategoryObserver from "../../components/admin/AdminCategoryObserver";
import Fetcher from "../../Fetcher/Fetcher";
import {$adminCategoryId, setAdminCategoryId} from "../../store/store";

interface Props{
    children?: ReactNode;
}

export default function AdminCategoriesPage({children}: Props) {

    const [categories, setCategories] = useState<[]>([])
    const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(localStorage.getItem('adminSettingsCategoryCurrentId') === null
        ? null
        : parseInt(($adminCategoryId).toString()))
    const [location, setLocation] = useState<string[]>([])
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()

    const fetcher = new Fetcher()
    const [categoryForEdit, setCategoryForEdit] = useState(null)


    useEffect(() => {

        async function getCategories(){
            const response = currentCategoryId !== null
                ? await fetcher.getForumCategoriesByParentId(currentCategoryId)
                : await fetcher.getForumCategories()
            currentCategoryId !== null
                ? setAdminCategoryId(currentCategoryId.toString())
                : setAdminCategoryId(null)
            setCategories(response)
        }
        getCategories()

    }, [])

    const onCategoryClicked = async (category: any) => {
        console.log("CUR ID:", category.id)

        if(category.has_children === 0){
            const message = "Категория не является родительской"
            showError(message)
            return
        }
        setCurrentCategoryId(category.id)
        localStorage.setItem('adminSettingsCategoryCurrentId', category.id)
        category.id !== null
            ? setAdminCategoryId(category.id.toString())
            : setAdminCategoryId(null)
        const response = await fetcher.getForumCategoriesByParentId(category.id)

        setCategories(response)

        let arr: string[] = location
        arr.splice(arr.length,0, category.title)
        setLocation(arr)
    }

    const refreshCategories = async () => {
        const response = currentCategoryId !== null
            ? await fetcher.getForumCategoriesByParentId(currentCategoryId)
            : await fetcher.getForumCategories()
        setCategories(response)
        setCategoryForEdit(null)
    }

    const getCategoryParent = async () => {
        const response = currentCategoryId !== null
            ? await fetcher.getCategoryParent(currentCategoryId)
            : await fetcher.getForumCategories()

        localStorage.setItem('adminSettingsCategoryCurrentId', response[0].id)


        let categories = currentCategoryId !== null
            ? await fetcher.getForumCategoriesByParentId(response[0].parent)
            : await fetcher.getForumCategories()
        setCategories(categories)

        let path: string[]
        path = [...location]
        path.pop()
        setLocation(path)
        setCurrentCategoryId(response[0].parent)
        localStorage.setItem('adminSettingsCategoryCurrentId', categories.parent)
        setAdminCategoryId(categories.parent)
    }

    const onCategoryEdit = function(category: any){
        console.log("ON_EDIT CLICKED")
        setCategoryForEdit(category)
    }

    const onCategoryDelete = async function(id: number){
        setCategoryForEdit(null)
        await fetcher.deleteForumCategory(id)
        await refreshCategories()
    }

    const cancelEdit = () => {
        setCategoryForEdit(null)
    }

    const showError = (errorText: string) => {
        setErrorMsg(errorText)
        setTimeout(() => {setErrorMsg('')}, 5000)
    }

    return(
        <div className={'admin-categories-page'}>
            <div className={'header'}>
                <div className={'upper-header'}>
                    <div className={'back-button'} onClick={() => {navigate('../', { replace: true })}}>{'❮'}</div>
                    Форум/Категории
                </div>
                <div className={'lower-header'}>
                    Форум/Категории
                </div>
            </div>
            <div className={'main-area'}>
                <div className={'admin-area'}>
                    <AdminCategorySettingsComponent
                        onCategorySave={refreshCategories}
                        editingCategory={categoryForEdit}
                        parentId={currentCategoryId}
                        onCancelEdit={cancelEdit}
                        onError={showError}>

                    </AdminCategorySettingsComponent>
                </div>
                <div className={'view-area'}>
                    <AdminCategoryObserver
                        categories={categories}
                        currentLocation={location}
                        onCategoryClicked={onCategoryClicked}
                        onGoToUpper={getCategoryParent}
                        onEdit={onCategoryEdit}
                        onDelete={onCategoryDelete}>

                    </AdminCategoryObserver>
                </div>
            </div>
            <div className={'alert-wrapper'}>
                {
                    errorMsg.length > 0
                        ? <div className="alert alert-danger" role="alert">{errorMsg}</div>
                        : null
                }
            </div>
        </div>
    )
}