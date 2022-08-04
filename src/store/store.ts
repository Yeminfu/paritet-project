import { createEvent, createStore } from 'effector'

export const setAdminSettingsCategoryCurrentIdState = createEvent<string | null>('setAdminSettingsCategoryCurrentIdState')
export const $adminSettingsCategoryCurrentId = createStore(localStorage.getItem('adminSettingsCategoryCurrentId'))
    .on(setAdminSettingsCategoryCurrentIdState, (o: any, n: string | null) => n)

//USER STATES
interface AuthData {
    token: string;
    user: {
        id?: number;
        username: string;
    }
}

export const setAuth = createEvent();
export const logout = createEvent();
export const $auth = createStore < null | AuthData > (null)
    .on(setAuth, (_, todo) => { return todo; })
    .on(logout, () => { return null; });


export const setRights = createEvent();
export const $rights = createStore([])
    .on(setRights, (_, todo) => todo);




//FORUM CATEGORIES STATES
export const setCurrentForumCategory = createEvent<string | null>();
export const $currentForumCategory = createStore(localStorage.getItem('currentForumCategory'))
    .on(setCurrentForumCategory, (o: any, n: string | null) => n)




//FORUM TOPICS STATES
export const setCurrentForumTopic = createEvent<string | null>();
export const $currentForumTopic = createStore(localStorage.getItem('currentForumTopic'))
    .on(setCurrentForumTopic, (o: any, n: string | null) => n)









