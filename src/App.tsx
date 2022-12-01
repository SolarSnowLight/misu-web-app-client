import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from "./pages/Main";
import Signup from "./pages/Signup/Signup";
import {useAppDispatch} from "./redux/reduxHooks";
import {appActions} from "./redux/appReducer";
import {useDebounce} from "./hooks/useDebounce";
import Login from "./pages/Login/Login";
import ArticleList from "./pages/ArticleList/ArticleList";
import ArticlePage from "./pages/Article/ArticlePage";
import ArticleEditor from './pages/ArticleEditor/ArticleEditor';
import Profile from "./pages/Profile/Profile";
import PwdRecoveryGetUserData from "./pages/PasswordRecovery/PwdRecoveryGetUserData";
import Test from "./pages/Test";
import PwdRecoverySetNewPwd from "./pages/PasswordRecovery/PwdRecoverySetNewPwd";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App() {

    const d = useAppDispatch()


    const onDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault()
        ev.stopPropagation()
        //d(appActions.setDragging(true))
        //d(appActions.setDraggingFiles(true))
/*

        d(appActions.setDragging())
        for(let item of ev.dataTransfer.items){
            if (item.kind==='file') {
                d(appActions.setDraggingFiles())
                break
            }
        }

*/
        // use kind: 'file'
        //console.log('ENTER:', ev)

    }


    const [dragging, setDragging] = useState({})
    useDebounce(()=>{
        d(appActions.setDragging(false))
        d(appActions.setDraggingFiles(false))
    }, 150, [dragging])


    const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault()
        ev.stopPropagation()


        d(appActions.setDragging())
        for(let item of ev.dataTransfer.items){
            if (item.kind==='file') {
                d(appActions.setDraggingFiles())
                break
            }
        }
        setDragging({})

        //console.log('OVER:', ev)
    }
    const onDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault()
        ev.stopPropagation()
        //d(appActions.setDragging(false))
        //d(appActions.setDraggingFiles(false))
        //console.log('LEAVE:', ev)
    }
    const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault()
        ev.stopPropagation()
        d(appActions.setDragging(false))
        d(appActions.setDraggingFiles(false))
    }


    /*const [showOverlay, setShowOverlay] = useState(false)
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)*/
    //if (!first) setTimeout(()=>{setShowOverlay(true); setFirst(true)}, 5000)
    //if (!second) setTimeout(()=>{setShowOverlay(false); setSecond(true)}, 10000)


    return <>
        <div style={{ display: 'contents' }}
                    onDragEnter={onDragEnter} onDragLeave={onDragLeave}
                    onDragOver={onDragOver} onDrop={onDrop}>
            <Routes>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/user/profile/*' element={<Profile/>}/>
                <Route path='/user/password/recovery' element={<PwdRecoveryGetUserData/>}/>
                <Route path='/auth/reset/password/:pwdToken' element={<PwdRecoverySetNewPwd/>}/>
                <Route path='/articles/user' element={<ArticleList/>}/>
                <Route path='/article/:articleId' element={<ArticlePage/>}/>
                <Route path='/article/create' element={<ArticleEditor/>}/>
                <Route path='/article/edit/:articleId' element={<ArticleEditor/>}/>

                <Route path='/test' element={<Test/>}/>

                <Route path='*' element={<Main/>}/>
            </Routes>

            {/*{ showOverlay && <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100%', height: '100vh', background: 'yellow' }}>

            </div> }*/}

        </div>

        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

    </>
}

export default App;
