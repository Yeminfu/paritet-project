import { createEvent, createStore } from 'effector'

export const setAdminCategoryId = createEvent<string | null>('setAdminCategoryId')
export const $adminCategoryId = createStore(localStorage.getItem('adminSettingsCategoryCurrentId'))
    .on(setAdminCategoryId, (o: any, n: string | null) => n)

//USER STATES
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









