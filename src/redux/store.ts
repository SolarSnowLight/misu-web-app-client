import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import {PersistConfig} from "redux-persist/es/types";
import createSagaMiddleware from 'redux-saga'
import { userReducer } from "./userReducer";
import {errorsReducer} from "./errorsReducer";
import {loadingReducer} from "./loadingReducer";
import {appReducer} from "./appReducer";



const userPersistConfig = {
    key: 'user',
    version: 1,
    storage: storage,
    stateReconciler: hardSet,
    // blacklist: ['auth'], // 'auth' will not be persisted
    // whitelist: ['smth'] // ONLY 'smth' will be persisted
}
const userPersistedReducer = persistReducer(
    // @ts-ignore
    userPersistConfig as PersistConfig<ReducerState<typeof userReducer>>,
    userReducer
)


export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userPersistedReducer,
        errors: errorsReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // todo plug in saga middleware
})

export type Store = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type example: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


/*
    This creates a Redux store, and also automatically configure the Redux DevTools extension
    so that you can inspect the store while developing.
 */




// Generic thunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>





type ReducerState<R = React.Reducer<any, unknown>> = R extends React.Reducer<infer S, unknown> ? S : never
type ReducerAction<R = React.Reducer<unknown, any>> = R extends React.Reducer<unknown, infer A> ? A : never