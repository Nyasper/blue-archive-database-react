import { type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

export function Header({ title, withSearchBar = false, handleSearch, backUrl }: Props) {
	return withSearchBar ? (
		<header id={styles.headerContainer}>
			{backUrl && (
				<Link to={backUrl} className={styles.backButton}>
					← Back
				</Link>
			)}
			<h1 className={styles.title}>{title}</h1>
			<input
				type="text"
				className={styles.searchBar}
				placeholder="Search..."
				onChange={handleSearch}
				// ref={inputRef}
			/>
		</header>
	) : (
		<header id={styles.titleContainer}>
			{backUrl && (
				<Link to={backUrl} className={styles.backButton}>
					← Back
				</Link>
			)}
			<h1 className={styles.title}>{title}</h1>
		</header>
	);
}

interface Props {
	title: string;
	handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
	withSearchBar: boolean;
	backUrl?: string;
	// inputRef: RefObject<HTMLInputElement>;
	// inputEvent: () => void;
}
