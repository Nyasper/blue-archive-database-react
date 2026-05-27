import CharaItem from './charaItem';
import styles from '@/styles/charaList.module.css';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../stores/storeContext';
import { CharaListSideComponent } from './charaListSideComponent';
import { Header } from './header';
import type { Student } from '../models/student.model';
import { getStudentMedia } from '../services/studentUtils';
import { useIsMobile } from '../hooks/useIsMobile';

export function CharaList({ title, students, error, backUrl }: Props) {
	const store = useContext(StoreContext);
	const isMobile: boolean = useIsMobile();

	const handleClick = (chara: Student) => {
		if (!store) return;
		store.changeCurrentCharacterPreview(
			chara.charaName,
			getStudentMedia(chara, 'imgFull')
		);
	};

	// reset the global state after component unmount
	useEffect(() => {
		return () => {
			if (!store) return;
			store.changeCurrentCharacterPreview('', '');
		};
	}, []);

	// Search Logic
	const [searchTerm, setSearchTerm] = useState('');
	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
	}

	let content: JSX.Element;

	if (error) {
		content = (
			<div className={styles.statusMessage}>
				<h2>Error</h2>
				<p>{error}</p>
			</div>
		);
	} else if (students.length === 0 && !!store?.loading) {
		content = (
			<div className={styles.statusMessage}>
				<h2>Loading...</h2>
			</div>
		);
	} else if (students.length === 0 && store?.loading) {
		content = (
			<div className={styles.statusMessage}>
				<h2>No Data</h2>
			</div>
		);
	} else {
		content = (
			<ul id={styles.charaList}>
				{students
					.filter((chara) => {
						return chara.charaName
							.toLowerCase()
							.replaceAll('_', ' ')
							.includes(searchTerm.toLowerCase());
					})
					.map((chara) => (
						<CharaItem
							key={chara.charaName}
							charaName={chara.charaName}
							school={chara.school}
							clickEvent={() => handleClick(chara)}
							withUrl={isMobile}
						/>
					))}
			</ul>
		);
	}

	return (
		<>
			<Header title={title} withSearchBar={true} handleSearch={handleSearch} backUrl={backUrl} />
			<div id={styles.charaListContainer}>
				<section>{content}</section>
				<CharaListSideComponent
					currentChara={store?.currentChara!}
				/>
			</div>
		</>
	);
}

interface Props {
	title: string;
	students: Student[];
	error: string | null;
	backUrl?: string;
}
