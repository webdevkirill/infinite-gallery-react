import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
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
			});
	}, [page, query]);

	const searchPhotos = (e) => {
		e.preventDefault();
		setPage(1);
		setQuery(e.target[0].value);
	};

	useEffect(() => {
		getPhotos();
	}, [getPhotos]);

	if (!accessKey) {
		return (
			<a href='https://api.unsplash.com/developers' className='error'>
				Получите API ключ и добавьте его в .env файл
			</a>
		);
	}

	return (
		<div className='app'>
			<h1>Бесконечная галерея Unsplash</h1>

			<form onSubmit={searchPhotos}>
				<input type='text' placeholder='Поиск в Unsplash...' />
				<button>Найти</button>
			</form>

			<InfiniteScroll
				dataLength={images.length} //This is important field to render the next data
				next={() => {
					setPage((page) => page + 1);
				}}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				<div className='image-grid'>
					{images.map((image) => (
						<a
							href={image.links.html}
							target='_blank'
							rel='noopener noreferrer'
							className='image'
							key={image.id}
						>
							<img
								src={image.urls.regular}
								alt={image.alt_description}
							/>
						</a>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
