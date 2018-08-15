import React from 'react';
import PropTypes from 'prop-types'
import PopoverRemedyAccardion from '../PopoverRemedyAccardion'
import { Collapse} from 'antd';
import './style.css'

class PopoverRemedy extends React.Component{
	
	filesRender = (dataArr) => {
        let remedyArr = [];

        dataArr.map((item, index) => { 
            remedyArr.push(<PopoverRemedyAccardion {...item}  key={item.id + ''+index}/>)
        });

        return remedyArr;
	};

    render(){
		
		const {postTitle} = this.props;
		
	    return (
			<div className='popover-file-body popover-remedy'>
				<p>{postTitle}</p>
				{this.filesRender(this.props.remedyArr)}
			</div>
	    );
	};
};

PopoverRemedy.propTypes ={
	data: PropTypes.arrayOf(PropTypes.object),
	postTitle: PropTypes.string,
};

PopoverRemedy.defaultProps = {
	data: [],
	postTitle: ''
};

export default PopoverRemedy
