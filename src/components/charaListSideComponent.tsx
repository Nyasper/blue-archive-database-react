import { Link } from 'react-router-dom';
import styles from '@/styles/charaList.module.css';
import type { CharacterImageGlobalState } from '../stores/storeContext';

export function CharaListSideComponent({
	currentChara,
}: Props) {
	const hasChara = currentChara && currentChara.name && currentChara.url;

	return (
		<aside id={styles.selectedImageContainer} className={hasChara ? styles.activePanel : styles.inactivePanel}>
			{hasChara ? (
				<>
					<h2 className={styles.sideTitle}>{currentChara.name}</h2>
					<p className={styles.sideSubtitle}>Selected Character</p>
					
					<Link to={currentChara.name} className={styles.imageLinkWrapper}>
						<img
							key={currentChara.url}
							className={`${styles.selectedImage} ${styles.animationFadeBlur}`}
							src={currentChara.url}
							alt={currentChara.name}
							draggable="false"
						/>
						<div className={styles.clickOverlay}>
							<span>View Details</span>
						</div>
					</Link>
				</>
			) : (
				<div className={styles.emptyState}>
					<div className={styles.emptyStateIcon}>✦</div>
					<h2 className={styles.sideTitle}>Select an Image</h2>
					<p className={styles.sideSubtitle}>Click any character to preview</p>
				</div>
			)}
		</aside>
	);
}

interface Props {
	currentChara: CharacterImageGlobalState;
}
