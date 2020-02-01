import React from "react";
import {articles} from "../articles";
import {ArticlePreviewer} from "./article";

export function List({setArticle}) {
	return articles.map((Article) => (
		<Article
			Renderer={ArticlePreviewer}
			articleId={Article.id}
			setArticle={setArticle}
			key={Article.id}
		/>
	));
}
