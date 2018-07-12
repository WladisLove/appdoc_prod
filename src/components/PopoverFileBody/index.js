import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '../Button'
import DownloadLink from '../DownloadLink'

import './style.css'

class PopoverFileBody extends React.Component{

	filesRender = (dataArr) => {
        let filesArr = [];

        dataArr.map((item, index) => { 
            filesArr.push(<DownloadLink {...item} size="default" type="link" svg icon="file" iconSize={16} download  key={item.id + ''+index}/>)
        });

        return filesArr;
    };
  	
    render(){
    	const { nameFile } = this.props;

	    return (
	      <div className='popover-file-body'>
				<div className='popover-file-block'>
					{this.filesRender(this.props.data)}
				</div>
				<Button
					size='file'
					type='file'
					icon='download'
					svg
					iconSize={23}
				/>
			</div>
	    );
	};
};

PopoverFileBody.propTypes ={
	data: PropTypes.arrayOf(PropTypes.object),
	nameFile: PropTypes.string,
};

PopoverFileBody.defaultProps = {
	data: [],
	nameFile: ''
};

export default PopoverFileBody
