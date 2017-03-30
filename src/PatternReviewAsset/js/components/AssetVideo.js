import React from 'react';
import Video from 'react-html5video';
const flowplayerVideo = { width: 600,
						height: 338 };

const AssetVideo = (props) => { 
	let videoStyle = {display:'block',
					  width:425,
					  height:300,
					 }
return(
<div className="pe-input pe-input--horizontal">
{/*<video controls autoPlay name="media">
  <source src={props.url} type={props.mtype}></source>
</video>
*/}
<a href="#" className="videoplayer" style={videoStyle} id="videoplayer"></a>
</div>)

/*return(<div className="pe-input pe-input--horizontal">
		<div style={flowplayerVideo} id="reviewAssestVideo">
		{/*<Video controls autoPlay>
            <source src={props.url} type="video/mp4" />
        </Video>
       *//*}*/
		/*</div></div>)*/
}

AssetVideo.propTypes = {
	url:React.PropTypes.string,
	mtype:React.PropTypes.string
}

export default AssetVideo;
