import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export default function Articles(props: IArticleProps) {
    const {filename, mdContent} = props 

    return <Wrap>
        <ReactMarkdown children={mdContent}/>
        <div>file: {filename}</div>
    </Wrap>
}

interface IArticleProps extends FrankSpace.IArticle {

}

const Wrap = styled.div`
    width: 750px;
    padding: 10px 20px;
    pre {
        margin: 5px;
        padding: 15px 5px;
        border-radius: 5px;
        background-color: black;
    
        code {
            color: white;
        }
    }
`