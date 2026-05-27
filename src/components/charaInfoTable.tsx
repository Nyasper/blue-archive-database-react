import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import {
	categoriesNoUrl,
	getStudentMedia,
	handleCategoryName,
	handleCategoryValue,
} from '../services/studentUtils';
import type { Student } from '../models/student.model';
import styles from '../styles/charaDetails.module.css';
import { Button } from '@mui/material';

export function CharaInfoTable({ categories, chara }: Props) {
	function renderCategories() {
		const hasBothIdentical = chara.designer && chara.illustrator && chara.designer === chara.illustrator;

		const filteredCategories = categories.filter(key => {
			if (hasBothIdentical && (key === 'designer' || key === 'illustrator')) {
				return false;
			}
			return true;
		});

		const rows = filteredCategories.map((categoryName) => (
			<tr key={categoryName}>
				<th>{handleCategoryName(categoryName)}</th>

				{categoryName !== 'voice' ? (
					<td>
						{categoriesNoUrl.includes(categoryName) ? (
							handleCategoryValue(categoryName, String(chara[categoryName]))
						) : (
							<Link
								to={`/characters/category/${categoryName}/${chara[categoryName]}`}
							>
								{handleCategoryValue(categoryName, String(chara[categoryName]))}
							</Link>
						)}
					</td>
				) : (
					<td>
						{handleCategoryValue(categoryName, String(chara[categoryName]))}
						<audio
							src={getStudentMedia(chara, 'audio')}
							ref={audioRef}
							onPlay={() => setIsPlaying(true)}
							onPause={() => setIsPlaying(false)}
							onEnded={() => setIsPlaying(false)}
						></audio>
						<Button type="button" onClick={handlePlayStop} variant="contained">
							{isPlaying ? '■' : '▶'}
						</Button>
					</td>
				)}
			</tr>
		));

		if (hasBothIdentical) {
			const originalIndex = categories.findIndex(key => key === 'designer' || key === 'illustrator');
			const combinedRow = (
				<tr key="designer-illustrator">
					<th>Designer/Illustrator</th>
					<td>
						<Link to={`/characters/category/illustrator/${chara.illustrator}`}>
							{chara.illustrator}
						</Link>
					</td>
				</tr>
			);
			if (originalIndex !== -1) {
				rows.splice(originalIndex, 0, combinedRow);
			} else {
				rows.push(combinedRow);
			}
		}

		return rows;
	}

	const [isPlaying, setIsPlaying] = useState(false);

	//Audio Play
	//refs
	const audioRef = useRef<HTMLAudioElement>(null);

	const handlePlayStop = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			setIsPlaying(false);
		} else {
			audioRef.current.volume = 0.2;
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	return (
		<div className={styles.tableContainer}>
			<table>
				<tbody>
					<tr>
						<th>Character</th>
						<td>{chara.charaName?.replaceAll('_', ' ')}</td>
					</tr>
					{renderCategories()}
					<tr>
						<th>Wiki URL</th>
						<td>
							<a href={chara.pageUrl} target="_blank">
								{chara.pageUrl}
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

interface Props {
	categories: (keyof Student)[];
	chara: Student;
}
