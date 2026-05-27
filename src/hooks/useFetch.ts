import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../stores/storeContext';

export function useFetch<T>(url: string) {
	const store = useContext(StoreContext);

	const [data, setData] = useState<T | undefined>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchData() {
			store?.setLoadingState(true);
			try {
				const response = await fetch(url, { signal });

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data: T = await response.json();
				setData(data);
			} catch (e) {
				if (e instanceof DOMException && e.name === 'AbortError') {
				} else {
					setError(`Error on Getting Data: \n${(e as Error).message}`);
					console.error(e);
				}
			} finally {
				store?.setLoadingState(false);
			}
		}

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, error };
}
