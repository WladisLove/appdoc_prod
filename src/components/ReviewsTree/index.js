import React from 'react';
import PropTypes from 'prop-types'

import Review from '../Review'
import Card from '../Card'
import Tabs from '../Tabs'
import DatePicker from '../DatePicker'
import Button from '../Button'
import Spinner from '../Spinner'
import moment from 'moment'
import { Translate } from 'react-localize-redux'
import './style.css'
import {message} from "antd";
const TabPane = Tabs.TabPane;

class ReviewsTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tab: "allTab",
            loadingReviewsFor: "",
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

            if (tab === "allTab"){
                this.props.onLoad(this.state[tab].numberOfRequest, this.props.limit);}
            else if (tab === "todayTab") {
                let todayStart = moment(+new Date()).startOf('day').format('X');
                let todayEnd = moment(+new Date()).endOf('day').format('X');
                this.props.onLoad(this.state[tab].numberOfRequest, this.props.limit, todayStart, todayEnd);
            }
            else if (tab === "periodTab" && this.state.range.length) {
                let [start, end] = this.state.range;
                this.props.onLoad(this.state[tab].numberOfRequest, this.props.limit, start / 1000, end / 1000);
            }
            else this.setState({loadingReviewsFor: ""});
        }
    };

    componentDidMount() {
        const initialTab = this.state.tab;
        this.loadMoreData(initialTab);
    }
    sendAnswerForReview = (obj) => {
        console.log(obj)
        this.props.onSend(obj)
            .then((res)=>{
                console.log(res, "RES ANSWER")
                if(res.data.code === 200) {
                    message.success(<Translate id="notifications.reviewSuccessfulAdd" />);
                    this.refresh();
                } else {
                    message.error(<Translate id="notifications.anErrorOccurredTryAgain" />)
                }
            })
    }
    componentWillUpdate(nextProps) {
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
    refresh = () => {
        const tab = this.state.tab;
        const limit = this.state[tab].reviews.length;
        if (tab === "allTab") {
            this.props.onLoad(0, limit)
                .then((res)=>{
                    this.setState({allTab : {...this.state.allTab, reviews:res.data.result}})
                });
        } else if (tab === "todayTab") {
            let todayStart = moment(+new Date()).startOf('day').format('X');
            let todayEnd = moment(+new Date()).endOf('day').format('X');
            this.props.onLoad(0, limit, todayStart, todayEnd)
                .then((res)=>{
                    this.setState({todayTab : {...this.state.todayTab, reviews:res.data.result}})
                });
        } else if (tab === "periodTab" && this.state.range.length) {
            let [start, end] = this.state.range;
            this.props.onLoad(0, limit, start / 1000, end / 1000)
                .then((res)=>{
                    this.setState({periodTab : {...this.state.periodTab, reviews:res.data.result}})
                });
        }
    }
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
        return (<Translate>
                  {({ translate }) =>
                      (<div className="reviewsTree-underTreeElement" key="btn">
                          <Button btnText={refreshBtn ? translate(`review.notClickUpdate`) : translate(`button.title.showMore`)}
                                  size='link'
                                  type='link'
                                  icon={refreshBtn ? 'circle_close' : 'circle_arrow_down'}
                                  onClick={() => this.loadMoreData(this.state.tab)}/>
                      </div>)
                  }
                </Translate>);
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
                                onSend={this.sendAnswerForReview}/>)
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
                    <p><Translate id="notifications.chooseDate" />.</p>
                </div>);
        else if (!this.state[this.state.tab].reviews.length)
            arr.push(this.renderShowMoreBtn(true));

        return arr;
    };


    render() {
        return (
            <Translate>
                {({ translate }) =>
                    (<Card title={this.props.isOnDoctorPage ? translate(`review.lot`) : translate(`review.all`)}
                          className="reviewsTree"
                          extra={!this.props.numberOfReviews ? null : this.props.numberOfReviews}>
                        <Tabs onChange={this.tabChangeHandler}
                              tabBarExtraContent={this.state.displayDP &&
                              <DatePicker small onChange={this.dpHandler} defaultValue={this.state.range}/>}>
                            <TabPane tab={translate(`all`)} key="allTab">
                                {this.renderRevs(this.state.allTab.reviews)}
                            </TabPane>
                            <TabPane tab={translate(`filter.forToday`)} key="todayTab">
                                {this.renderRevs(this.state.todayTab.reviews)}
                            </TabPane>
                            <TabPane tab={translate(`filter.forPeriod`)} key="periodTab">
                                {this.renderRevs(this.state.periodTab.reviews)}
                            </TabPane>
                        </Tabs>
                    </Card>)
                }
            </Translate>
        )
    }
}

ReviewsTree.propTypes = {
    data: PropTypes.array,
    limit: PropTypes.number,
    numberOfReviews: PropTypes.number,
    onLoad: PropTypes.func,
    onSend: PropTypes.func,
    isOnDoctorPage: PropTypes.bool,
    isDoctor: PropTypes.bool
};

ReviewsTree.defaultProps = {
    data: [],
    limit: 3,
    numberOfReviews: 0,
    onLoad: () => {},
    onSend: () => {},
    isOnDoctorPage: false,
    isDoctor: false
};

export default ReviewsTree
