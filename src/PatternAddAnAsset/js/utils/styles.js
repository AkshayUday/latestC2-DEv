let content = {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'hidden',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
 
  };
let
  horizontalScrollBarStyle ={
  	width: 20, 
  	height: 5, 
  	marginTop: 1,
  	borderRadius: 5
  };
let
  horizontalContainer ={
  	height: 10, 
  	left: 0, 
  	bottom: 0, 
  	borderRadius: 5, 
  	background: 'white'
  };
let
  verticalScrollStyle = {
  	width: 6, 
  	borderRadius: 5
  };
let
  verticalContainerStyle = {
  	width : 11, 
  	borderRadius: 5, 
  	background: 'white'
  }
export { content, horizontalScrollBarStyle, horizontalContainer, verticalScrollStyle, verticalContainerStyle }
