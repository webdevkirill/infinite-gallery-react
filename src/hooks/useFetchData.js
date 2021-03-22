import { useCallback, useEffect, useState } from 'react';

export default function useFetchData(accessKey) {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');

	const getPhotos = useCallback(() => {
		let apiUrl = `https://api.unsplash.com/photos?`;
		if (query) {
			apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
		}
		apiUrl += `&client_id=${accessKey}`;
		apiUrl += `&page=${page}`;

		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				const imagesFromApi = data.results ?? data;
				if (page === 1) {
					setImages(imagesFromApi);
				} else {
					setImages((images) => [
						...new Set([...images, ...imagesFromApi]),
					]);
				}
			})
			.catch((_) => {
				console.error('Превышен лимит запросов к Unsplash');
			});
	}, [page, query, accessKey]);

	const searchPhotos = (e) => {
		e.preventDefault();
		setPage(1);
		setQuery(e.target[0].value);
	};

	useEffect(() => {
		getPhotos();
	}, [getPhotos]);

	return {
		images,
		setPage,
		searchPhotos,
	};
}
