import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Article from '@src/components/article';

const fs = require('fs');
const path = require('path');

export default function ArticlePage (props) {
    const route = useRouter();
    const key = `${route.query.article}`;
    const {aritcleMap} =  props
    const content = aritcleMap && key ? aritcleMap[key] : 'EMPTY'

    return <Article mdContent={content} filename={key}/>
}

export const getStaticPaths: GetStaticPaths = async function () {
    const articleDir = path.join(process.cwd(),'src/articles');
    const aritclePaths = await fs.readdirSync(articleDir);
    const articles = aritclePaths.filter(article=>article !== '.DS_Store').map(article=>article.replace(/\.\w+/,''))
    const paths = articles.map(article => ({
        params: {
            article
        }
    }))
    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async function (context) {
    const articleDir = path.join(process.cwd(),'src/articles');
    const aritclePaths = await fs.readdirSync(articleDir);
    const articleFiles = aritclePaths.filter(article=>article !== '.DS_Store')
    const articles: {
        filename: string,
        content: string
    }[] = await Promise.all(articleFiles.map(async (filename) => {
        const filepath = path.join(articleDir,filename)
        const content = await fs.readFileSync(filepath, {encoding: 'utf8'})

        return {
            filename: filename.replace(/\.\w+/,''),
            content
        }
    }))
    let aritcleMap = {};
    articles.forEach(article=>{
        aritcleMap[article.filename] = article.content
    })

    return {
        props: {
            aritcleMap
        }
    }
}