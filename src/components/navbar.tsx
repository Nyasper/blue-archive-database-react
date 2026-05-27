import { Link, useLocation } from 'react-router-dom';
import styles from '@/styles/navbar.module.css';

export function Navbar() {
	const Links = [
		{
			name: 'Home',
			path: '/',
		},
		{
			name: 'All Characters',
			path: '/characters',
		},
		{
			name: 'Categories',
			path: '/characters/category/all',
		},
	];
	const currentRoute = useLocation().pathname;

	return (
		<nav>
			<ul id={styles.navBarUl}>
				<li id={styles.logoImgContainer}>
					<img id={styles.logoImg} src="/extras/Shiroko_Swimsuit_Icon.png" />
				</li>
				{Links.map((link) => (
					<li key={link.name} className={styles.navLi}>
						<Link
							to={link.path}
							className={`${styles.aNavbar} ${currentRoute === link.path ? styles.currentRoute : ''
								}`}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
