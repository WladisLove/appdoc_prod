import React from 'react'
import PropTypes from 'prop-types'
import ScrollArea from 'react-scrollbar'
import AddNewDoctorItem from '../AddNewPatientItem'
import Modal from '../Modal'
import Input from '../Input'
import './styles.css'
import Spinner from "../Spinner";
import { Translate } from 'react-localize-redux'


class AddNewDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: props.data,
            inputValue: "",
            loading: false
        };
    }

    doctorsRender = (dataArr) => {
        return dataArr.map((item, index) => {
            return (<AddNewDoctorItem {...item}
                                      onAdd={this.props.onAdd}
                                      key={item.id + '' + index}
                                      searchQuery={this.state.inputValue}
                                      myDoctorsPage={this.props.myDoctorsPage}

            />)
        });

    };

    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible && nextProps.visible === true)
            this.setState({
                inputValue: '',
                loading: false,
                doctors: []
            })
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({inputValue: e.target.value});
        clearTimeout(this.timer);
        if (e.target.value.length === 3)
            this.triggerChange(value);
        else if (e.target.value.length > 3)
            this.timer = setTimeout(this.triggerChange, 800);
        else this.props.onClear();
    };

    triggerChange = (value) => {
        const searchString = value || this.state.inputValue;
        this.setState({loading: true});
        this.props.onSearch(searchString)
            .then((res) => {
                if (res.status === 200)
                    this.setState({loading: false});
            })
            .catch((err) => console.log(err))
    };

    handleKeyDown = (e) => {
        if (e.target.value.length > 2) {
            if (e.keyCode === 13) {
                clearTimeout(this.timer);
                this.props.onSearch(this.state.inputValue);
            }
        }
        else this.props.onClear();
    };

    handleSearch = () => {
        if (this.state.inputValue.length > 2) {
            clearTimeout(this.timer);
            this.triggerChange();
        }
        else this.props.onClear();
    };

    render() {
        const {visible, onCancel} = this.props;

        return (
            <Modal title={<Translate id="modal.title.addingDoctorToList" />}
                   visible={visible}
                   onCancel={onCancel}
                   width={560}
            >
                <Translate>
                    {({ translate }) =>
                        (<div className='new-doctor'>
                            <div className='new-doctor-search'>
                                <Input.Search placeholder={translate('doctor.search.input')}
                                              ref={inp => this.inp = inp}
                                              onSearch={this.handleSearch}
                                              onChange={this.handleChange}
                                              onKeyDown={this.handleKeyDown}
                                              value={this.state.inputValue}/>
                            </div>
                            <div className='new-doctor-title'>{translate('searchResult')}</div>
                            <ScrollArea
                                speed={1}
                                className="new-doctor-list"
                                contentClassName="content"
                                horizontal={false}>
                                {this.state.inputValue.length > 2 ?
                                    (
                                        this.state.loading ? <Spinner/> :
                                            this.props.data.length === 0 ?
                                                (<div className="no-doctors">{translate('doctor.search.notFound')}</div>)
                                                : this.doctorsRender(this.props.data)
                                    )
                                    : (<div className="no-doctors">{translate('notifications.moreCharactersForSearch')}</div>)}
                            </ScrollArea>
                        </div>)
                    }
                </Translate>
            </Modal>
        )

    }
}

AddNewDoctor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func,
    onSearch: PropTypes.func,
    onClear: PropTypes.func
};

AddNewDoctor.defaultProps = {
    data: [],
    visible: false,
    onCancel: () => {
    },
    onAdd: () => {
    },
    onSearch: () => {
    },
    onClear: () => {
    }
};

export default AddNewDoctor;
