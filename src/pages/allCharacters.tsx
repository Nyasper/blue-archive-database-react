import { useContext } from 'react';
import { CharaList } from '../components/charaList';
import { StoreContext } from '../stores/storeContext';

export default function Allcharacters() {
	const store = useContext(StoreContext);

	return (
		<CharaList
			title={'All Characters'}
			students={store?.students ?? []}
			error={store?.studentsError ?? null}
		/>
	);
}
