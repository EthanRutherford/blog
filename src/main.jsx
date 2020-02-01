import React, {useState, useEffect, useCallback} from "react";
import {render} from "react-dom";
import {List} from "./ui/list";
import {ArticleRenderer} from "./ui/article";
import {articleMap} from "./articles";
import styles from "./styles/root";
import "./styles/reset";

function getInitialState() {
	const id = history.state ? history.state.articleId : location.hash.slice(1);
	return {Article: articleMap[id]};
}

function useCurrentArticle() {
	const [{Article}, setState] = useState(getInitialState);

	useEffect(() => {
		history.replaceState({articleId: location.hash.slice(1)}, null, location.hash);
		window.onpopstate = (event) => {
			setState({Article: articleMap[event.state.articleId]});
		};
	}, []);

	return {
		Article,
		setArticle: useCallback((articleId) => {
			history.pushState({articleId}, null, `/#${articleId}`);
			setState({Article: articleMap[articleId]});
		}, []),
		goBack: useCallback(() => {
			history.pushState({articleId: null}, null, "/");
			setState({Article: null});
		}, []),
	};
}

function App() {
	const {Article, setArticle, goBack} = useCurrentArticle();

	return (
		<div className={styles.mainContent}>
			<div className={styles.header}>
				<a
					className={styles.title}
					href="/"
					onClick={(event) => {
						event.preventDefault();
						goBack();
					}}
				>bleg</a>
			</div>
			{Article == null ? (
				<List setArticle={setArticle} />
			) : (
				<Article
					Renderer={ArticleRenderer}
					articleId={Article.id}
					goBack={goBack}
				/>
			)}
		</div>
	);
}

render(<App />, document.getElementById("react-root"));
