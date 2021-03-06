import React from 'react';
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import PatientAnalyzesItem from '../PatientAnalyzesItem'
import Card from '../Card'
import Icon from '../Icon'
import ScrollArea from 'react-scrollbar'

import './style.css'
import '../../icon/style.css'


class PatientAnalyzes extends React.Component{

    analyzesRender = (dataArr) => {
        let analyzesArr = [];

        dataArr.map((item,index) => {
            analyzesArr.push(<PatientAnalyzesItem key={index} {...item}/>)
        });

        return analyzesArr;
    }

    render(){
        const { data } = this.props;

        return (
            <div className='analyzes-all'>
                <Card style={{height: 500}} title={<Translate id="reminding" />}>
                    <ScrollArea
                        speed={1}
                        className="content-wrapper"
                        contentClassName="content"
                        horizontal={false}
                        vertical = {true}
                        style = {{zIndex: 7}}
                    >
                    {this.analyzesRender(this.props.data)}
                    </ScrollArea>
                </Card>
            </div>
        )
    }
}

PatientAnalyzes.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

PatientAnalyzes.defaultProps = {
    data: [],
};

export default PatientAnalyzes
