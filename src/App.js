import React, { useEffect, useState } from 'react';
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setImages(data);
			});
	}, []);

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

			<div className='image-grid'>
				{[...Array(100)].map((_, index) => (
					<div className='image' key={index}>
						<img
							src='https://placekitten.com/g/1920/1080'
							alt='Sample'
						/>
					</div>
				))}
			</div>
		</div>
	);
}
