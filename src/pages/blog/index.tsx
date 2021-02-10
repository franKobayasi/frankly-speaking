import Link from "next/link";
import { GetStaticProps } from "next";
import ArticleList from "@src/components/articleList";

const fs = require("fs");
const path = require("path");

function Blog(props) {
  return (
    <>
      <div>This is Blog List</div>
      <ArticleList articleFiles={props.articleFiles}/>
    </>
  );
}

export default Blog;

export const getStaticProps: GetStaticProps = async function (context) {
  const articleDir = path.join(process.cwd(), "src/articles");
  const aritclePaths = await fs.readdirSync(articleDir);
  const articleFiles = aritclePaths.filter(
    (article) => article !== ".DS_Store"
  ).map(filename=>filename.replace(/\.\w+/,''));

  return {
    props: {
      articleFiles,
    },
  };
};
