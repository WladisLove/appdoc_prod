import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import Col from "../Col";
import ScrollArea from "react-scrollbar";
import HistoryReceptionsItems from "../HistoryReceptionsItems";

class HistoryReceptions extends React.Component{
    constructor(props){
        super(props);

    }

    historyRender = (dataArr) => {
        let historyArr = [];
        dataArr.forEach((item) => {
                historyArr.push(<HistoryReceptionsItems {...item}
                                                    personalPage = {this.props.personalPage}
                                                    onGotoChat = {this.props.onGotoChat}
                                                    />)
        });

        return <ScrollArea>{...historyArr}</ScrollArea>;
        // historyArr.push(this.renderShowMoreBtn(dataArr))

    };

    // renderShowMoreBtn = (arr) => {
    //     if (this.state.limit < arr.length && this.state.limitedShow){
    //         return (
    //             <div className="table-footer">
    //                     <Button
    //                         btnText='Показать еще'
    //                         size='link'
    //                         type='link'
    //                         icon='circle_arrow_down'
    //                         onClick = {() => {this.setState({limitedShow: false})}}
    //                     />
    //                 </div>)
    //     }
    // };

    componentWillMount() {
        this.props.getApps({id_doc: this.props.id_doc})
    }

    render(){
        console.log("RENDER HISTORY RECEPTIONS");
        return (
            <div className='receptions-all'>
                <Card title="История обращений">
                    {this.historyRender(this.props.data)}
                  </Card>
            </div>
        )
    }
}

HistoryReceptions.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    onGotoChat: PropTypes.func,
};

HistoryReceptions.defaultProps = {
    data: [],
    limit: 7,
    onGotoChat: () => {},
};

export default HistoryReceptions