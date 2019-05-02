import React, {Component} from 'react';
import Button from "../Button";
import Dropzone from 'react-dropzone'
import {message} from "antd"
import Spinner from "../Spinner";
import RegistrationForm from "../Registration";
import { Translate } from 'react-localize-redux'

class DropZoneUpload extends Component {
    constructor() {
        super();

        this.state = {
            accepted: []
        }
    }

    handleDrop = (files) => {
        this.setState({loading: true});
        this.props.uploadFile(files[0])
            .then(res => {
                if(res){
                        const file = res.data.file[0];
                        if (file.url && file.name) {
                            message.success(<Translate id="notifications.fileSuccessUpload" />)
                            this.setState({accepted: [...this.state.accepted, {name: file.name, deleteUrl: file.deleteUrl}]})
                        } else if (res.data.file[0].error) {
                            message.error(res.data.file[0].error)
                        } else {
                            message.error(<Translate id="notifications.anErrorOccurredTryAgain" />)
                        }
                        this.props.onChange && this.props.onChange([...this.props.value, file]);
                        this.setState({loading: false})
                }
            })
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== this.props.value) {
            this.setState({accepted: nextProps.value})
        }
    }

    deleteElement = (e, file) => {
        e.preventDefault();
        let files = [...this.props.value];
        let indexToDelete = files.map(item => item.name).indexOf(file.name);
        files.splice(indexToDelete, 1);
        this.props.onChange && this.props.onChange(files);
    }
    render() {
        let files = [];

        if (this.props.value && this.props.value.length) {
            files = [...this.props.value]
        } else if (this.state.accepted.length) {
            files = [...this.state.accepted];
        } else {
            files = [];
        }
        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div data-files={this.state.accepted}>
                        <Dropzone
                            onDrop={this.handleDrop}
                            style={{width: "100%", display: "flex", alignItems: "center"}}
                            multiple={false}
                            docsfiles={this.state.accepted}

                        >
                            <Button btnText={this.props.text || translate('attachDocument')}
                                    size='upload'
                                    type='upload'
                                    icon='upload'
                                    iconSize={36}
                                    svg
                                    onClick={e => e.preventDefault()}
                            /> {this.state.loading && <Spinner size="small" isInline={true}></Spinner>}
                        </Dropzone>
                        {
                            files.length > 0 && files.map(f => <div key={f.name}>{f.name}
                                <button
                                    onClick={(e)=>{
                                        this.deleteElement(e, f)
                                    }}
                                    style={{
                                        display: "inline-block",
                                        background: "none",
                                        outline: "none",
                                        marginLeft: "10px",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                x
                            </button>
                            </div>)
                        }
                    </div>)
                }
            </Translate>
        </div>);
    }
}


DropZoneUpload.defaultProps = {
    value: []
};

export default DropZoneUpload;
