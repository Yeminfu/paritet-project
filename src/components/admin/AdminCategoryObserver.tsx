import React, {ReactNode, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './AdminCategoryObserver.scss'

interface Props{
    children?: ReactNode;
    categories: [];
    onCategoryClicked: any;
    onGoToUpper: any;
    onEdit: any;
    onDelete: any;
    currentLocation: string[];
}

export default function AdminCategoryObserver({children, categories, onCategoryClicked, onGoToUpper, currentLocation, onEdit, onDelete}: Props){

    useEffect(() => {
        console.log("CURLOC", currentLocation)
    })

    const getCategoriesList = categories?.map(function(e: any, index: number){
        return <tr className={'table-row'} onClick={() => {onCategoryClicked(e)}} style={{
            height: '64px',
            cursor: 'pointer',
            width: '100%',
            backgroundColor: e.has_children === 1 ? 'rgba(44, 225, 99, .15)' : 'rgba(225, 44, 99, .15)',
            verticalAlign: 'middle'}}
                   key={index+Math.random()+9389356}>
                   <th scope="row">{index+1}</th>
                   <td style={{flex: 1}}>{e.title}</td>
                   <td style={{flex: 1}}>{e.description}</td>
                   <td style={{flex: 1}}>{e.slug}</td>
                   <td className={'optional-column'}>
                       <img className={'optional-button'}
                            src={process.env.PUBLIC_URL + '/assets/IconEdit.svg'}
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                event.nativeEvent.stopImmediatePropagation()
                                onEdit(e)
                            }}
                            alt={''}/>
                       <img className={'optional-button'}
                            src={process.env.PUBLIC_URL + '/assets/IconDelete.svg'}
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                event.nativeEvent.stopImmediatePropagation()
                                onDelete(e.id)
                            }}
                            alt={''}/>
                   </td>
               </tr>
    })

    const getPath = function(){
        return currentLocation.join(' • ')
    }


    return(
        <div className={'category-observer'}>
            <div className={'header'}>
                <div className={'back-button'} onClick={onGoToUpper}>{'❮'}</div>
                <div className={'location'}>{getPath()}</div>
            </div>
            <table className="table" style={{
                height: '64px',
                width: '100%',
                verticalAlign: 'middle'}}>
                <thead style={{position: 'sticky', left: 0, top: 0, backgroundColor: 'white'}}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Ярлык</th>
                    </tr>
                </thead>
                <tbody style={{
                    overflowY: 'auto',
                    height: '100%'}}>
                { [getCategoriesList] }
                </tbody>
            </table>
        </div>
    )
}