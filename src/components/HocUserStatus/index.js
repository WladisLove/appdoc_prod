import React from 'react';
import { getHocStatus, removeCallback, getReadyState } from '../../containers/App/chatWs';

function hocUserStatus(Component){
    return class HocUserStatus extends React.Component {
        constructor(props) {
            super(props); 
            this.state = {
                online: false,
                idCallback: Date.now()
            };

            this.requestToSocket()
            this.intervalStatus = setInterval(() => {
                this.requestToSocket()
            }, 5000);
        }

        requestToSocket = () => {
            const {id} = this.props

            if('CONNECTING' == getReadyState() && id){ 
                
                getHocStatus(this.state.idCallback, id,  (mes) => this.setState({online: mes.status}) )          
                
            }  
        }

        componentWillUnmount() {
            clearInterval(this.intervalStatus);
            removeCallback(this.state.idCallback)
        }
        render(){
           
            return <Component 
                        {...this.props} 
                        online={this.state.online}
                        key={this.state.idCallback}
                        />;
        }
    }
}

export default hocUserStatus;