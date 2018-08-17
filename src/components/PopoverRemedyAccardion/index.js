import React from 'react';
import PropTypes from 'prop-types'
import ScrollArea from 'react-scrollbar'
import PopoverRemedyItem from '../PopoverRemedyItem'
import { Collapse} from 'antd';
import './style.css'

class PopoverRemedyAccardion extends React.Component{

	filesRender = (dataArr) => {
        let filesArr = [];

        dataArr.map((item, index) => { 
            filesArr.push(<PopoverRemedyItem {...item}  key={item.id + ''+index}/>)
        });

        return filesArr;
	};
	

    render(){
		
		const { nameRemedy } = this.props;
		const Panel = Collapse.Panel;

	    return (
			<Collapse>
				<Panel header={nameRemedy} key="1">
					<ScrollArea
							speed={0.5}
							className="remedy__list"
							contentClassName="content"
							horizontal={false}
					>
						{this.filesRender(this.props.filesArr)}
					</ScrollArea>
				</Panel>
			</Collapse>
	    );
	};
};

PopoverRemedyAccardion.propTypes ={
	data: PropTypes.arrayOf(PropTypes.object),
	nameRemedy: PropTypes.string,
};

PopoverRemedyAccardion.defaultProps = {
	data: [],
	nameRemedy: ''
};

export default PopoverRemedyAccardion
