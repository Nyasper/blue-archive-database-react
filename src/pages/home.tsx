import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '@/styles/home.module.css';

export default function Home() {
	return (
		<div id={styles.homeContainer}>
			{/* Section 1: Hero Intro */}
			<section id={styles.heroSection}>
				<img
					src="/extras/Shiroko_Swimsuit_Icon.png"
					alt="Shiroko"
					className={styles.homeImg}
				/>
				<h1>Welcome to Blue Archive database</h1>
				<p>
					Blue Archive is a free-to-play gacha-like mobile game developed by Nexon Games.
				</p>
				<Button variant="contained" className={styles.discoverButton}>
					<Link to={'/characters'}>Start discovering Characters</Link>
				</Button>

				{/* Arrow Down Indicator */}
				<div id={styles.arrowDownContainer}>
					<span id={styles.arrowText}>Learn more about the project</span>
					<div id={styles.arrowDown}>↓</div>
				</div>
			</section>

			{/* Section 2: About Project */}
			<section id={styles.aboutSection}>
				<div className={styles.spriteWrapper}>
					<img 
						src="/extras/Shiroko_Swimsuit_Sprite.webp" 
						alt="Shiroko Swimsuit" 
						className={styles.aboutSprite} 
					/>
				</div>
				<div className={styles.textContent}>
					<span className={styles.projectTag}>// SCHALE SYSTEM ARCHIVE</span>
					<h2>About this Project</h2>
					<p>
						<span>Blue Archive Database</span> is a web application designed to help fans explore
						a comprehensive collection of data from the popular mobile game,{' '}
						<a
							href="https://bluearchive.nexon.com/home"
							className={styles.anchor}
							target="_blank"
							rel="noopener noreferrer"
						>
							Blue Archive
						</a>
						.
					</p>

					<p>
						Developed using React and modern CSS styling, the core focus of this
						project is to provide a seamless and visually appealing experience 
						for searching and viewing detailed character information.
					</p>

					<p>
						Please note that all character assets, models, and illustrations showcased 
						here are the property of their respective creators. The data and media 
						featured were sourced from the community-driven{' '}
						<a
							href="https://bluearchive.wiki/wiki/Characters"
							target="_blank"
							className={styles.anchor}
							rel="noopener noreferrer"
						>
							wiki
						</a>{' '}
						and are utilized strictly for educational and portfolio purposes.
					</p>
				</div>
			</section>
		</div>
	);
}
