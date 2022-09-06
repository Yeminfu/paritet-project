import { createEvent, createStore } from 'effector'

export const setAdminCategoryId = createEvent<string | null>('setAdminCategoryId')
export const $adminCategoryId = createStore(localStorage.getItem('adminSettingsCategoryCurrentId'))
    .on(setAdminCategoryId, (o: any, n: string | null) => n)


//USER STATES
//
interface AuthData {
    token: string;
    user: {
        id: number;
        username: string;
    }
}

export const setAuth = createEvent<null | AuthData>();
export const logout = createEvent();
export const $auth = createStore < null | AuthData > (null)
    .on(setAuth, (_, newState: null | AuthData) => { console.log("NEW STATE:", newState); return newState; })
    .on(logout, () => { console.log("NEW STATE:", null); return null; });


export const setRights = createEvent();
export const $rights = createStore([])
    .on(setRights, (_, todo) => todo);

export const setHeaderPath = createEvent<string>()
export const $headerPath = createStore<string>('')
    .on(setHeaderPath, (_, newPath: string) => {return newPath})

export const setBreadCrumbs = createEvent<Array<string>>()
//export const addBreadCrumbs = createEvent<{crumb: string}>()
export const $breadCrumbs: any = createStore(['Главная'])
    .on(setBreadCrumbs, (oldState, newState: Array<string>) => newState)
    //.on(addBreadCrumbs, (o, n: [{crumb: string}]) => n)


//NEWS CACHE
//
interface NewsModel {
    id: number;
    title: string;
    slug: string;
    description: string;
    dateTime: string;
    content: [];
}

export const setNewsCache = createEvent<null | NewsModel[]>();
export const $newsCache = createStore<null | NewsModel[]>(null)
    .on(setNewsCache, (_, newState: null | NewsModel[]) => newState);


//PAGES COORDINATES
export const setMainCoords = createEvent<number>();
export const setNewsCoords = createEvent<number>();
export const setForumCatsCoords = createEvent<number>();
export const setForumTopicsCoords = createEvent<number>();

export const $mainCoords = createStore<number>(0)
    .on(setMainCoords, (old, newState) => {
        console.log("NSm:", newState); return newState})
export const $newsCoords = createStore<number>(0)
    .on(setNewsCoords, (_, newState) => {
        console.log("NSn:", newState); return newState})
export const $forumCatsCoords = createStore<number>(0)
    .on(setForumCatsCoords, (_, newState) => {
        console.log("NSf:", newState); return newState})
export const $forumTopicsCoords = createStore<number>(0)
    .on(setForumTopicsCoords, (_, newState) => {
        console.log("NSft:", newState); return newState})







