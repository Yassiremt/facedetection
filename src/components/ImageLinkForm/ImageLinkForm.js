import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return(
		<div>
			<p className="f4">
				{"This Magic brain will detect faces in your pictures ,git it a try. "}
			</p>
			<div className='center'>
				<div className='center form pa3 br3 shadow-5'>
					<input
						type='text'
						className="f4 pa2 w-70 center"
						onChange={onInputChange}
					/>
					<button
						className='w-30 grow f4 link ph3 pv2 dib white btn-a'
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
		);
	};

export default ImageLinkForm;
