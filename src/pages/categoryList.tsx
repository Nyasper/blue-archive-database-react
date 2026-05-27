import { useNavigate, useParams } from 'react-router-dom';
import { CharaList } from '../components/charaList';
import { useContext, useEffect, useMemo } from 'react';
import { StoreContext } from '../stores/storeContext';
import type { Student } from '../models/student.model';
import {
	handleCategoryName,
	handleCategoryValue,
} from '../services/studentUtils';

export function CategoryList() {
	const { categoryName, categoryValue } = useParams<{
		categoryName: string;
		categoryValue: string;
	}>();
	const navigate = useNavigate();
	const { students: allStudents } = useContext(StoreContext)!;

	useEffect(() => {
		if (!allStudents || allStudents.length === 0) return;

		if (categoryName && !categoryValue) {
			navigate(`/characters/category/${categoryName}`);
		}
		if (!categoryName || !categoryValue) {
			navigate('/characters/category/all');
		}
		const allProps = Object.keys(allStudents[0]);
		if (!allProps.includes(categoryName!)) {
			navigate(`/characters/category/${categoryName}`);
		}
	}, [categoryName, categoryValue, allStudents]);

	const students = useMemo(() => {
		const currentCategory = categoryName as keyof Student;

		return allStudents.filter((s) => s[currentCategory] === categoryValue);
	}, [categoryName, categoryValue, allStudents]);

	return (
		<CharaList
			students={students}
			error={null}
			title={`${handleCategoryName(
				categoryName as keyof Student
			)}: ${handleCategoryValue(categoryName as any, categoryValue!)}`}
			backUrl={`/characters/category/${categoryName}`}
		/>
	);
}
