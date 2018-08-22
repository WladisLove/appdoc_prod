import React from 'react';
import PropTypes from 'prop-types'

import Review from '../Review'
import Card from '../Card'
import Tabs from '../Tabs'
import DatePicker from '../DatePicker'
import Button from '../Button'
import Spinner from '../Spinner'
import moment from 'moment'

import './style.css'
const TabPane = Tabs.TabPane;

class ReviewsTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab: "allTab",
            loadingReviewsFor: "allTab",
            displayDP: false,
            range: [],
            allTab: {
                reviews: [],
                numberOfRequest: 0,
                isShowMoreBtnEnabled: true,
            },
            todayTab: {
                reviews: [],
                numberOfRequest: 0,
                isShowMoreBtnEnabled: true,
            },
            periodTab: {
                reviews: [],
                numberOfRequest: 0,
                isShowMoreBtnEnabled: false,
            }
        };
    };

    loadMoreData = (tab) => {
        if (!this.state.loadingReviewsFor) {
            this.setState({loadingReviewsFor: tab});

            if (tab === "allTab")
                this.props.onShowMore(this.state[tab].numberOfRequest, this.props.limit);
            else if (tab === "todayTab") {
                let todayStart = moment(+new Date()).startOf('day').format('X');
                let todayEnd = moment(+new Date()).endOf('day').format('X');
                this.props.onShowMore(this.state[tab].numberOfRequest, this.props.limit, todayStart, todayEnd);
            }
            else if (tab === "periodTab" && this.state.range.length) {
                let [start, end] = this.state.range;
                this.props.onShowMore(this.state[tab].numberOfRequest, this.props.limit, start / 1000, end / 1000);
            }
            else this.setState({loadingReviewsFor: ""});
        }
    };

    componentWillUpdate(nextProps){
        const loadingTab = this.state.loadingReviewsFor;
            if (loadingTab && nextProps.data !== this.props.data) {
                this.setState({
                    [loadingTab]: {
                        reviews: [...this.state[loadingTab].reviews, ...nextProps.data],
                        numberOfRequest: this.state[loadingTab].numberOfRequest + 1,
                        isShowMoreBtnEnabled: nextProps.data.length >= this.props.limit
                    },
                    loadingReviewsFor: ""
                });
            }
    };

    tabChangeHandler = (tab) => {
        this.setState({tab: tab});
        this.setState({displayDP: tab === "periodTab"});
        if (!this.state[tab].numberOfRequest)
            this.loadMoreData(tab);
    };

    dpHandler = (range) => {
        this.setState({
            periodTab: {
                reviews: [],
                numberOfRequest: 0,
                isShowMoreBtnEnabled: false
            },
            range: range,
        }, () => this.loadMoreData("periodTab"));
    };

    renderShowMoreBtn = (refreshBtn) => {
        return (
            <div className="reviewsTree-underTreeElement" key="btn">
                <Button btnText={refreshBtn ? 'Нет отзывов. Нажмите чтобы обновить' : 'Показать еще'}
                        size='link'
                        type='link'
                        icon={refreshBtn ? 'circle_close' : 'circle_arrow_down'}
                        onClick={() => this.loadMoreData(this.state.tab)}/>
            </div>);
    };

    renderRevs = (dataArr) => {
        let arr = [];
        dataArr.map((item) => {
                arr.push(<Review {...item}
                                isDoctor = {this.props.isDoctor}
                                isOnDoctorPage = {this.props.isOnDoctorPage}
                                key={item.id}
                                onGoto={this.props.onGoto}
                                onGotoChat={this.props.onGotoChat}
                                onSend={this.props.onSend}/>)
        });

        if(this.state.loadingReviewsFor)
            arr.push(<div className="reviewsTree-underTreeElement" key="spinner">
                <Spinner/>
            </div>);
        else if (this.state[this.state.tab].isShowMoreBtnEnabled)
            arr.push(this.renderShowMoreBtn(false));
        else if (this.state.tab === "periodTab" && !this.state.range.length)
            arr.push(
                <div className="reviewsTree-underTreeElement" key="suggestion">
                    <p>Выберите дату.</p>
                </div>);
        else if (!this.state[this.state.tab].reviews.length)
            arr.push(this.renderShowMoreBtn(true));

        return arr;
    };


    render() {
        return (
            <Card title={this.props.isOnDoctorPage ? "Отзывы" : "Все отзывы"}
                  className="reviewsTree"
                  extra={this.props.isOnDoctorPage || !this.props.numberOfReviews ? null : this.props.numberOfReviews}>
                <Tabs onChange={this.tabChangeHandler}
                      tabBarExtraContent={this.state.displayDP &&
                      <DatePicker small onChange={this.dpHandler} defaultValue={this.state.range}/>}>
                    <TabPane tab="Все" key="allTab">
                        {this.renderRevs(this.state.allTab.reviews)}
                    </TabPane>
                    <TabPane tab="За сегодня" key="todayTab">
                        {this.renderRevs(this.state.todayTab.reviews)}
                    </TabPane>
                    <TabPane tab="За период" key="periodTab">
                        {this.renderRevs(this.state.periodTab.reviews)}
                    </TabPane>
                </Tabs>
            </Card>
        )
    }
}

ReviewsTree.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    numberOfReviews: PropTypes.number,
    onShowMore: PropTypes.func,
    onSend: PropTypes.func,
    isOnDoctorPage: PropTypes.bool,
    isDoctor: PropTypes.bool
};

ReviewsTree.defaultProps = {
    data: [],
    limit: 3,
    numberOfReviews: 0,
    onShowMore: () => {},
    onSend: () => {},
    isOnDoctorPage: false,
    isDoctor: false
};

export default ReviewsTree