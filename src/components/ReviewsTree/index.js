import React from 'react';
import PropTypes from 'prop-types'

import Review from '../Review'
import Card from '../Card'
import Tabs from '../Tabs'
import DatePicker from '../DatePicker'
import Button from '../Button'
import Spinner from '../Spinner'

import './style.css'
const TabPane = Tabs.TabPane;

class ReviewsTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            displayDP: false,
            range: [],
            data: [],
            todayRevs: [],
            periodRevs: [],
            numberOfRequest: 0,
            loadingData: true,
            isShowMoreBtnEnabled: true
        };
    }

    sortToday = () => {
        let curDate = (new Date()).getDate();

        return this.state.data.filter((item) => {
            return curDate === new Date(+item.date * 1000).getDate();
        });
    };

    sortPeriod = (period = this.state.range) => {
        const [start, end] = period;

        return this.state.data.filter((item) => {
            let date = new Date(+item.date * 1000);
            return date > start && date < end;
        });
    };

    loadMoreData = () => {
        if (!this.state.loadingData) {
            this.props.onShowMore(this.state.numberOfRequest);
            this.setState({loadingData: true});
        }
        else return null;
    };

    componentWillUpdate(nextProps){
        if (nextProps.data !== this.props.data){
            let newData = this.state.data;
            newData.push(...nextProps.data);

            let todayRevs = this.sortToday();
            let periodRevs = this.sortPeriod();

            this.setState({
                todayRevs: todayRevs,
                periodRevs: periodRevs,
                numberOfRequest: this.state.numberOfRequest + 1,
                loadingData: false,
                data: newData
            });

            if (nextProps.data.length < this.props.limit)
                this.setState({isShowMoreBtnEnabled: false});
        }
    }

    tabChangeHandler = (tab) => {
        tab === 'period' ? this.setState({displayDP: true}) : this.setState({displayDP: false});
    };

    dpHandler = (range) => {
        this.setState(prev => ({
            periodRevs: this.sortPeriod(range),
            range
        }));
    };

    renderShowMoreBtn = () => {
        if (this.state.isShowMoreBtnEnabled){
            return (
                <div style={{textAlign: 'center',}} key="btn">
                    <Button btnText='Показать еще'
                            size='link'
                            type='link'
                            icon='circle_arrow_down'
                            onClick={this.loadMoreData}/>
                </div>);
        }
    };

    renderSpinner = () => {
        return (<div style={{textAlign: 'center',}} key="btn">
            <Spinner/>
        </div>);
    };

    renderRevs = (dataArr) => {
        let arr = [];
        dataArr.map((item) => {
                arr.push(<Review {...item}
                                isOnDoctorPage = {this.props.isOnDoctorPage}
                                key={item.id}
                                onGoto={this.props.onGoto}
                                onGotoChat={this.props.onGotoChat}
                                onSend={this.props.onSend}/>)
        });

        if (this.state.loadingData)
            arr.push(this.renderSpinner());
        else if (this.state.isShowMoreBtnEnabled)
            arr.push(this.renderShowMoreBtn());

        return arr;
    };


    render(){
        console.log(this.props, "PROPS FROM REVIEWS");
        const data = this.state.data;

        return (
            <Card title={this.props.isOnDoctorPage ? "Отзывы": "Все отзывы"}
                  className="reviewsTree"
                  extra={data.length ? data.length : null}>
                <Tabs onChange={this.tabChangeHandler}
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
    isOnDoctorPage: PropTypes.bool,
    onSend: PropTypes.func
};

ReviewsTree.defaultProps = {
    data: [],
    limit: 3,
    isOnDoctorPage: false,
    onSend: () => {}
};

export default ReviewsTree