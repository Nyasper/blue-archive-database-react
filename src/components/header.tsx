import { type ChangeEvent } from 'react';
import styles from '../styles/header.module.css';

export function Header({ title, withSearchBar = false, handleSearch }: Props) {
	return withSearchBar ? (
		<header id={styles.headerContainer}>
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
			<h1 className={styles.title}>{title}</h1>
		</header>
	);
}

interface Props {
	title: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	withSearchBar: boolean;
	// inputRef: RefObject<HTMLInputElement>;
	// inputEvent: () => void;
}
