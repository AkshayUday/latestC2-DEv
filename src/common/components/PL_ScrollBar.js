import React from 'react';
import Scroll from 'react-scrollbar';
import {horizontalScrollBarStyle, horizontalContainer, verticalScrollStyle,
        verticalContainerStyle} from '../../PatternAddAnAsset/js/utils/styles';
const PL_ScrollBar = (props) => { 
let isBoolean = true;
let scrollContent = (

	<Scroll
         className={props.classname}
         contentClassName="content"
         verticalScrollbarStyle={verticalScrollStyle}
         verticalContainerStyle={verticalContainerStyle}
         horizontalScrollbarStyle={horizontalScrollBarStyle}
         horizontalContainerStyle={horizontalContainer}
         smoothScrolling= {isBoolean}
         vertical={isBoolean}
         horizontal={isBoolean}
        >
        	{props.children}

        </Scroll>);

        return(scrollContent);

}

export default PL_ScrollBar;
