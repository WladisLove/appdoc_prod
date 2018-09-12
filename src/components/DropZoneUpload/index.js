import React, {Component} from 'react';
import Button from "../Button";
import Dropzone from 'react-dropzone'
import {message} from "antd"
import Spinner from "../Spinner";

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
                const file = res.data.file[0];
                if (file.url && file.name) {
                    message.success("Файл успешно загружен")
                    this.setState({accepted: [...this.state.accepted, {name: file.name}]}) //file.deleteUrl can be added
                } else if (res.data.file[0].error) {
                    message.error(res.data.file[0].error)
                } else {
                    message.error("Произошла ошибка, попробуйте ещё раз")
                }
                this.props.onChange && this.props.onChange(this.state.accepted);
                this.setState({loading: false})

            })
    };



    render() {
        return (
            <div data-files={this.state.accepted}>
                <Dropzone
                    onDrop={this.handleDrop}
                    style={{width: "100%", display: "flex", alignItems: "center"}}
                    multiple={false}
                    docsfiles={this.state.accepted}

                >
                    <Button btnText={this.props.text || "Прикрепить документ"}
                            size='upload'
                            type='upload'
                            icon='upload'
                            iconSize={36}
                            svg
                            onClick={e => e.preventDefault()}
                    /> {this.state.loading && <Spinner size="small" isInline={true}></Spinner>}
                </Dropzone>
                {
                    this.state.accepted && this.state.accepted.map(f => <div key={f.name}>{f.name} </div>)
                }
            </div>
        );
    }
}

export default DropZoneUpload;