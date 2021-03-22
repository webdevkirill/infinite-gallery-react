import React, { useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
	const [images, setImages] = useState([]);

	useEffect(() => {
		getPhotos();
	}, []);

	const getPhotos = () => {
		fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`)
			.then((res) => res.json())
			.then((data) => {
				setImages((images) => [...images, ...data]);
			});
	};

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

			<form>
				<input type='text' placeholder='Поиск в Unsplash...' />
				<button>Найти</button>
			</form>

			<InfiniteScroll
				dataLength={images.length} //This is important field to render the next data
				next={getPhotos}
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
