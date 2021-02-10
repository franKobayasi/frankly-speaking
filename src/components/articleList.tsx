import Link from 'next/link'
import styled from "styled-components"

export default function ArticleList(props: IArticleListProps) {
    return <ul>
        {props.articleFiles.map((filename,index) => {
        return <li key={`${filename}-${index}`}>
            <Link href={`/blog/${filename}`}>{filename}</Link>
        </li>
        })}
    </ul>
}

interface IArticleListProps {
    articleFiles: string[]
}
