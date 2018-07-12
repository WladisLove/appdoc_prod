import React from 'react';
import PropTypes from 'prop-types'

import Review from '../Review'
import Card from '../Card'
import Tabs from '../Tabs'
import DatePicker from '../DatePicker'
import Button from '../Button'

import './style.css'
const TabPane = Tabs.TabPane;

class ReviewsTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayDP: false,
            range: [],
            limit: this.props.limit,
            limitedShow: true,
            todayRevs: this.sortToday(props.data),
            periodRevs: [],
        };
    }
    // отзывы должны быть размещены в соответствии с: чем меньше id, тем раньше он был опубликован

    sortToday = (dataArr = this.props.data) => {
        let curDate = (new Date()).getDate();
        let revArr = [];


        dataArr.every((item) => {
            if (curDate === new Date(+item.date).getDate()){
                revArr.push(item);
                return true;
            }
            else
                return false;
        });
        return revArr;
    };

    sortPeriod =(period = this.state.range) => {
        const [start, end] = period;
        let revArr = [];

        this.props.data.map((item) => {
            let date = new Date(+item.date);
            if (date > start && date < end)
                revArr.push(item);
        });
        return revArr;
    };

    componentWillUpdate(nextProps){
        if (nextProps.data !== this.props.data){
            //console.log('!!! New data receive');
            this.setState(prev => ({
                todayRevs: this.sortToday(nextProps.data),
                range: [],
                periodRevs: [],
                limitedShow: true,
            }));
        }
    }

    tabChangeHadler = (tab) => {
        this.setState(prev => ({limitedShow: true}));
        tab === 'period' ?
            this.setState({displayDP: true}) : this.setState({displayDP: false});
    };

    dpHandler = (range) => {
        this.setState(prev => ({
            periodRevs: this.sortPeriod(range),
            range
        }));
    };

    renderShowMoreBtn = (revArr) => {
        if (this.state.limit < revArr.length && this.state.limitedShow){
            return (
                <div style={{textAlign: 'center',}} key="btn">
                    <Button btnText='Показать еще'
                            size='link'
                            type='link'
                            icon='circle_arrow_down'
                            onClick={() => this.setState(prev => ({limitedShow:false}))}/>
                </div>)
        }
    };

    renderRevs = (dataArr) => {
        let arr = [];
        dataArr.map((item, i) => {
            if (this.state.limit > i || !this.state.limitedShow){
                arr.push(<Review {...item} 
                                key={item.id} 
                                onGoto={this.props.onGoto}
                                onGotoChat={this.props.onGotoChat}
                                onSend={this.props.onSend}/>)
            }
        });
        arr.push(this.renderShowMoreBtn(dataArr));
        return arr;
    };


    render(){
        const {data} = this.props;

        return (
            <Card title="Все отзывы"
                  className="reviewsTree"
                  extra={data.length}>
                <Tabs onChange={this.tabChangeHadler}
                      tabBarExtraContent={this.state.displayDP && <DatePicker small onChange={this.dpHandler} defaultValue={this.state.range}/>}>
                    <TabPane tab="Все" key="all">
                        {this.renderRevs(data)}
                        </TabPane>
                    <TabPane tab="За сегодня" key="today">
                        {this.renderRevs(this.state.todayRevs)}
                        </TabPane>
                    <TabPane tab="За период" key="period">
                        {this.renderRevs(this.state.periodRevs)}
                        </TabPane>
                </Tabs>
            </Card>
        )
    }
}

ReviewsTree.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    onSend: PropTypes.func,
};

ReviewsTree.defaultProps = {
    data: [],
    limit: 5,
    onSend: () => {},
};

export default ReviewsTree