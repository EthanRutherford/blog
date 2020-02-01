import React, {useState, useEffect} from "react";
import {DisqusSection} from "./disqus-section";
import styles from "../styles/article";

export function ArticlePreviewer({articleId, heroPhoto, title, setArticle, children}) {
	return (
		<div className={styles.preview}>
			<img className={styles.previewImage} src={heroPhoto} />
			<div className={styles.previewDetails}>
				<a
					className={styles.previewTitle}
					href={`/#articleId`}
					onClick={(event) => {
						event.preventDefault();
						setArticle(articleId);
					}}
				>
					{title}
				</a>
				{children[0]}
			</div>
		</div>
	);
}

export function ArticleRenderer({articleId, heroPhoto, title, children}) {
	return (
		<div className={styles.article}>
			<img className={styles.heroPhoto} src={heroPhoto} />
			<div className={styles.content}>
				<h1 className={styles.title}>{title}</h1>
				{children}
				<DisqusSection articleId={articleId} />
			</div>
		</div>
	);
}

ArticlePreviewer.useLazyData = () => null;
ArticleRenderer.useLazyData = (initializer) => {
	const [state, setState] = useState(null);
	useEffect(() => {
		initializer().then(setState);
	}, []);

	return state;
};
