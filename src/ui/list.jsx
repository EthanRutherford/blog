import React from "react";
import {pins, list} from "../articles";
import {ArticlePreviewer} from "./article";
import styles from "../styles/article";

function renderArticles(articles, setArticle, isPinned) {
	return articles.map((Article) => (
		<Article
			Renderer={ArticlePreviewer}
			articleId={Article.id}
			setArticle={setArticle}
			isPinned={isPinned}
			key={Article.id}
		/>
	));
}

export function List({setArticle}) {
	return (
		<>
			{renderArticles(pins, setArticle, true)}
			<div className={styles.separator} />
			{renderArticles(list, setArticle)}
		</>
	);
}
