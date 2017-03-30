import React from 'react'

const flowplayerAudio =  { width: 600 };

const AssetAudio = (props) => { 
let audioStyle =  {display:'block',
					  width:425,
					  height:30,
					 }
return(<div className="pe-input pe-input--horizontal">
    {/*<video controls autoPlay name="media">
    <source src={props.url} type={props.mtype}></source> 
    </video>*/}
    <a href="#" className="audioplayer" style={audioStyle} id="audioplayer"></a>
	</div>)



/*return(<div className="pe-input pe-input--horizontal">
<div id="reviewAssestAudio"  data-audio-only = "true"  className="playful" style={flowplayerAudio}>
	{/*<audio controls="controls"><source type="audio/mpeg" src={props.url} /></audio>*//*}
</div>
</div>)*/


}

AssetAudio.propTypes = {
	url:React.PropTypes.string,
	mtype:React.PropTypes.string
}

export default AssetAudio;

