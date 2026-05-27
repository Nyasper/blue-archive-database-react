import styles from '@/styles/categoryView.module.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo } from 'react';
import { StoreContext } from '../stores/storeContext';
import {
	getPropertyDataDistinct,
	handleCategoryValue,
} from '../services/studentUtils';
import {
	type ExcludedCategoriesUrl,
	categoriesNoUrl,
	handleCategoryName,
} from '../services/studentUtils';
import type { Student } from '../models/student.model';

export default function CategoryView() {
	const navigate = useNavigate();
	const { categoryName } = useParams<{ categoryName: string }>();

	// const category = categoryName ? `category/${categoryName}` : 'category/all';
	const { students } = useContext(StoreContext)!;
	const allCategoriesKeys = useMemo(() => {
		if (!students || students.length === 0) return [];
		return Object.keys(students[0]);
	}, [students]);

	const allCategories = useMemo(() => {
		if (!students || students.length === 0) return [];
		return getPropertyDataDistinct(
			students,
			categoryName as ExcludedCategoriesUrl
		);
	}, [students, categoryName]);

	// route param validation
	const isSpecificCategory: boolean = allCategoriesKeys.includes(categoryName!);
	const isInvalidParam = useMemo(() => {
		if (!students || students.length === 0) return false;
		return (
			!categoryName ||
			allCategories.length === 0 ||
			!allCategoriesKeys.includes(categoryName) ||
			categoriesNoUrl.includes(categoryName as any)
		);
	}, [students, categoryName, allCategories, allCategoriesKeys]);

	useEffect(() => {
		if (students.length > 0 && isInvalidParam) {
			navigate('/characters/category/all');
		}
	}, [students, isInvalidParam, navigate]);

	function renderlinkList() {
		return (
			<ul id={styles.categoryUlList}>
				{allCategories.map((category, index) => (
					<li key={index}>
						{isSpecificCategory ? (
							<Link to={`/characters/category/${categoryName}/${category}`}>
								{handleCategoryName(
									handleCategoryValue(
										categoryName as keyof Student,
										String(category)
									) as keyof Student
								)}
							</Link>
						) : (
							<Link to={`/characters/category/${category}`}>
								{handleCategoryName(category as keyof Student)}
							</Link>
						)}
					</li>
				))}
			</ul>
		);
	}

	return (
		<div id={styles.categoryDivContainer}>
			{isSpecificCategory && (
				<Link to="/characters/category/all" className={styles.backButton}>
					← Return to Categories
				</Link>
			)}
			{isSpecificCategory ? (
				<h2>Select a value for: {handleCategoryName(categoryName as keyof Student)}</h2>
			) : (
				<h2>View characters by:</h2>
			)}
			{renderlinkList()}
		</div>
	);
}
