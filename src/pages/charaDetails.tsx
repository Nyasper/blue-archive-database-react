import { useParams } from 'react-router-dom';
import styles from '@/styles/charaDetails.module.css';
import { CharaInfoTable } from '../components/charaInfoTable';
import { getStudentMedia } from '../services/studentUtils';
import { useContext } from 'react';
import { StoreContext } from '../stores/storeContext';
import { getKeysWithoutNull } from '../services/studentUtils';

export default function CharaView() {
	const { charaName } = useParams();

	//get data
	const { students, loading } = useContext(StoreContext)!;

	if (students.length === 0 && loading) {
		return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Loading character details...</h2>;
	}

	const student = students.find((s) => s.charaName === charaName);
	if (!student) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Student not found</h2>;
	const categories = getKeysWithoutNull(student);

	return (
		<article id={styles.charaViewContainer}>
			<img
				key={`ambient-${student.charaName}`}
				src={getStudentMedia(student, 'imgFull')}
				alt=""
				className={styles.charaAmbientBg}
				draggable="false"
			/>
			<div className={styles.imgContainer}>
				<img
					key={student.charaName}
					src={getStudentMedia(student, 'imgFull')}
					alt={`${student.charaName} full image`}
					className={`${styles.charaFullImage} ${styles.charaEntranceAnim}`}
				/>
			</div>
			<CharaInfoTable categories={categories} chara={student} />
		</article>
	);
}
