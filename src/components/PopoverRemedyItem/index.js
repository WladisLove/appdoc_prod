import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'antd';
import './style.css'
import MapsModal from '../MapsModal'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Translate } from 'react-localize-redux'

class PopoverRemedyItem extends React.Component{
	state = {
		visible: false
	}

	showModal = () => {
	  this.setState({
		visible: true,
	  });
	}

	handleCancelModal = () => {
	  this.setState({
		visible: false,
	  });
	}


    render(){
		const { namePharmacy, pricePharmacy, adressPharmacy } = this.props;

	    return (<div>
					<Translate>
							{({ translate }) =>
									(<div className='remedy__item'>
										<div className='patient-contacts-title'>{namePharmacy}<span>{pricePharmacy}</span></div>
										<a className="link link-size-default link-type-link" >
											<Icon type="environment-o" />
											<span onClick={this.showModal}>{adressPharmacy}</span>
										</a>
										<MapsModal
											title={translate('modal.map.location')}
											visible={this.state.visible}
											onOk={this.handleOk}
											onCancel={this.handleCancelModal}
										>
											<YMaps>
												<Map state={{
													center: [53.90, 27.55],
													zoom: 12
												}}>
													<Placemark
														geometry={{
															coordinates: [53.90, 27.55]
														}}
													/>
												</Map>
											</YMaps>
										</MapsModal>
									</div>)
							}
					</Translate>
	    </div>);
	};
};

PopoverRemedyItem.propTypes ={
	namePharmacy: PropTypes.string,
	pricePharmacy: PropTypes.string,
	adressPharmacy: PropTypes.string,
};

PopoverRemedyItem.defaultProps = {
	namePharmacy: '',
	pricePharmacy: '',
	adressPharmacy: '',
};

export default PopoverRemedyItem
