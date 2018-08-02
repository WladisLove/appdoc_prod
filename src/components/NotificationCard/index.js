import React from 'react';
import PropTypes from 'prop-types'
import Card from '../Card'
import NotificationItem from '../Notification'

import './style.css'
import ScrollArea from 'react-scrollbar'

class NotificationCard extends React.Component{
    constructor(props) {
        super(props);
    }

    notificationRender = (dataArr) => {
        let notificationArr = [];
        dataArr.map((item, index) => {
            notificationArr.push(<NotificationItem {...item} 
                getId={this.props.getId}
                key={item.id}/>)
        });
        return notificationArr;
    };

    render() {
        return (

            <div className='notification-card'>


                    <Card title="Уведомления">
                        <ScrollArea
                            speed={1}
                            className="scroll"
                            contentClassName="content"
                            horizontal={false}
                            verticalScrollbarStyle = {{
                              background: "#fdc401",
                            }}
                            verticalContainerStyle = {{
                                right: 5
                            }}
                        >
                            {this.notificationRender(this.props.data)}
                        </ScrollArea>
                    </Card>

            </div>

        );
    }

    
}

NotificationCard.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    getId: PropTypes.func,
};

NotificationCard.defaultProps = {
    data: [],
    getId: () => {},
};

export default NotificationCard
