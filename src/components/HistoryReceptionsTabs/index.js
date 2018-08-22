import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import ScrollArea from 'react-scrollbar'
import HistoryReceptionsItem from '../HistoryReceptionsItem'
import Card from '../Card'
import Button from '../Button'
import Input from '../Input'
import Tabs from '../Tabs'
import DatePicker from '../DatePicker'
import Hoc from '../Hoc'

import './style.css'
import '../../icon/style.css'
import Spinner from "../Spinner";
const TabPane = Tabs.TabPane;

class HistoryReceptionsTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'all',
            date: {},
            name: '',
            max: 1,
            old: 0,
            count: 0,
            loadedCount: 0,
            data: [],
            loading: true,
            rangeSet: [],
            noData: true
        };
    }





    tabChangeHadler = (currentTab) => {
      this.setState({tab:currentTab, data:[]})
    };


    componentWillMount() {
        this.getTreatments();
    }


    componentWillReceiveProps(newProps) {

      if(newProps.data.length && this.state.loading) {
        this.setState({
          data: [...this.state.data, ...newProps.data],
          loading:false,
          loadedCount:this.state.loadedCount+newProps.data.length,
          noData: false})
      } else if(!newProps.data.lenght) {
        this.setState({noData:true})
      }

      if(newProps.treatmentsCount !== this.state.count) {
        this.setState({count:newProps.treatmentsCount})
      }
    }

    getTreatments = () => {
      let obj ={...this.state};
      if(this.state.date.datestart && this.state.date.dateend) {
        obj.datestart = this.state.date.datestart;
        obj.dateend = this.state.date.dateend;
      }
      this.props.getTreatments(obj)
    };

    dpHandler = (range) => {
        let _range = range.length ? {
            datestart: moment(range[0]).hour(0).minute(0).second(0).millisecond(0).format("X"),
            dateend: moment(range[1]).hour(23).minute(59).second(59).millisecond(999).format("X")
    } : {};
        this.setState({
          date: _range,
          old:0,
          count: 0,
          loadedCount: 0,
          data: [],
          loading: true,
          rangeSet:[
            moment(range[0]).hour(0).minute(0).second(0).millisecond(0),
            moment(range[1]).hour(0).minute(0).second(0).millisecond(0)
          ]
        }, () => {
          this.getTreatments()
        })

    };
    loadMore = () => {
      this.setState({old: this.state.old+this.state.max, loading: true}, ()=> {
        this.getTreatments()
      })
    };


    historyRender = (dataArr) => {
          if(!dataArr.length && this.state.loading &&this.state.noData) {
            return <div className="table-footer"
                 key="btn">
                      <Button btnText={'Нет обращений. Нажмите чтобы обновить.' }
                              size='link'
                              type='link'
                              icon={'circle_close'}
                              onClick={() => this.setState({noData: false},() => {
                                this.getTreatments()
                              })}/>
                  </div>
          }
          let history = dataArr.map((item, i) => {
                if(item.doc_name) {
                    return (<HistoryReceptionsItem {...item}
                                        onGotoChat = {this.props.onGotoChat}
                                        onGoto={this.props.onGoto}
                                        key={'histRecept' + i}
                                        isUser = {this.props.isUser}

                    />)
                }

            });
      if(this.state.count > this.state.loadedCount && !this.state.loading) {
        history.push(
          <div className="table-footer"
               key="btn">
            <Button btnText='Показать еще'
                    size='link'
                    type='link'
                    title='Показать ещё'
                    icon='circle_arrow_down'
                    onClick={this.loadMore}/>
          </div>
        );
      } else if(this.state.loading && !this.state.noData){
        history.push(
        <div className="table-footer"
             key="btn">
          <Spinner size="small" />
        </div>)
      }
      return history

    };


    tabHeaderRender = () => {
        return (
            <Hoc>
                <div className="tableheader">
                    <div className="flex-col">
                        <div className="receptions-status new">Новые</div>
                    </div>
                    <div className="flex-col">
                        <div className="receptions-status topical">Актуальные</div>
                    </div>
                    <div className="flex-col">
                        <div className="receptions-status completed">Завершенные</div>
                    </div>
                    <div className="flex-col">
                        <div className="receptions-status extra">Экстренные</div>
                    </div>
                </div>
                <div className="tableheader menu-header">
                    <div className="flex-col">
                        <div className="tableheader-name">{this.props.isUser? "Врач" : "Имя пациента"}</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Дата приема</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Диагноз</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Комментарий к приему</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Стоимость</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Заключение</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Отзыв</div>
                    </div>
                    <div className="flex-col">
                        <div className="tableheader-name">Файлы</div>
                    </div>
                </div>
            </Hoc>
        )
    };

    searchChange = () => {

    };


    render() {
      console.log(this.props.data, "PROPS DAA FROM HRT", this.state.data)
        return (
            <div className='receptions-all'>
                <Card title="История обращений">
                    <Tabs onChange={this.tabChangeHadler}
                          defaultActiveKey='all'
                          tabBarExtraContent={
                              <div className='extra-panel'>
                                  <DatePicker small
                                              onChange={this.dpHandler}
                                              defaultValue={this.state.rangeSet}
                                  />
                                  <Input.Search
                                      placeholder="Поиск..."
                                      onChange = {this.searchChange}

                                  />
                              </div>}>
                        <TabPane tab="Все" key="all">
                            <ScrollArea
                                speed={1}
                                className=""
                                contentClassName="content"
                                horizontal={true}
                            >
                                {this.tabHeaderRender()}
                                {this.historyRender(this.state.data)}
                            </ScrollArea>
                        </TabPane>
                        <TabPane tab="Завершенные" key="completed">
                            <ScrollArea
                                speed={1}
                                className=""
                                contentClassName="content"
                                horizontal={true}
                            >
                                {this.tabHeaderRender()}
                                {this.historyRender(this.props.data)}
                            </ScrollArea>
                        </TabPane>
                        <TabPane tab="Актуальные" key="topical">
                            <ScrollArea
                                speed={1}
                                className=""
                                contentClassName="content"
                                horizontal={true}
                            >
                                {this.tabHeaderRender()}
                                {this.historyRender(this.props.data)}
                            </ScrollArea>
                        </TabPane>
                        <TabPane tab="Предстоящие" key="upcoming">
                            <ScrollArea
                                speed={1}
                                className=""
                                contentClassName="content"
                                horizontal={true}
                            >
                                {this.tabHeaderRender()}
                                {this.historyRender(this.props.data)}
                            </ScrollArea>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

HistoryReceptionsTabs.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    limit: PropTypes.number,
    onGoto: PropTypes.func,
    onGotoChat: PropTypes.func,
};

HistoryReceptionsTabs.defaultProps = {
    data: [],
    limit: 7,
    onGoto: () => {},
    onGotoChat: () => {},
};

export default HistoryReceptionsTabs