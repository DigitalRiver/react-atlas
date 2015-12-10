import React from 'react';
import Media from '../../components/media';

const MediaTest = () => (
  <section>
    <h5>Media</h5>
	<div style={{"width": "400px"}}>
		<Media aspectRatio="wide" image="https://placeimg.com/800/450/nature" />
	</div>
	<div style={{"width": "400px"}}>
		<Media contentOverlay aspectRatio="square" image="https://placeimg.com/700/700/nature" />
	</div>
	<div style={{"width": "400px"}}>
		<Media aspectRatio="wide" image="https://placeimg.com/800/450/nature" />
	</div>
	<div style={{"width": "400px"}}>
		<Media aspectRatio="wide">
			<iframe width="1280" height="720" src="https://www.youtube.com/embed/sGbxmsDFVnE?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe>
		</Media>
	</div>
	<div style={{"width": "400px"}}>
		<Media image="https://placeimg.com/400/400/nature" />
	</div>
	<div style={{"width": "400px"}}>
		<Media image="https://placeimg.com/400/400/nature" />
	</div>
	<div style={{"width": "400px"}}>
		<Media aspectRatio="square" image="https://placeimg.com/400/400/nature" />
	</div>
  </section>
);

export default MediaTest;
