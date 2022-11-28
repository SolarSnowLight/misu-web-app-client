import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import Header from "src/components/Header";
import ArticleView from "src/pages/ArticleView/ArticleView";
import {articleService} from "src/api-service/articleService";
import {Article} from "src/api-service/articleServiceUtils";




const ArticlePage = () => {

    const { articleId } = useParams()
    const nav = useNavigate()

    const [article, setArticle] = useState(undefined as Article|undefined)
    useEffect(()=>{(async()=>{
        if (articleId){
            const r = await articleService.getArticleById(articleId)
            if (r.type==='error') {
                console.log(r.error)
                return
            }
            setArticle(r.data.article)
        }
    })()},[articleId])

    const onList = () => {
        nav(`/articles/user`)
    }
    const onEdit = () => {
        nav(`/article/edit/${articleId}`)
    }
    const onDelete = async () => {
        if (articleId){
            const r = await articleService.deleteArticle(articleId)
            if (r.type==='error') {
                console.log(r.error)
                return
            }
            nav(`/articles/user`)
        }
    }


    return <div>
        <Header>
            <div>
                <button onClick={onList}>Список статей пользователя</button>
                <button onClick={onDelete}>Удалить</button>
                <button onClick={onEdit}>Редактировать</button>
            </div>
        </Header>
        <Page>
            <ArticleFrame>
                { article && <ArticleView article={article}/> }
            </ArticleFrame>
        </Page>
    </div>
}
export default React.memo(ArticlePage)



const Page = React.memo(styled.div`
  width: 100%;
  background: #FCFCFC;
`)
const ArticleFrame = React.memo(styled.div`
  width: fit-content;
  padding: 20px;
  margin: auto;
`)


