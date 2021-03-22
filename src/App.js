import React from 'react';
import './App.css';

export default function App() {
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
