import React from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetchData from './hooks/useFetchData';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
	const { images, setPage, searchPhotos } = useFetchData(accessKey);

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
				dataLength={images.length}
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
