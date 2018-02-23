import React from 'react'
import { Row, Col, ReviewsTree, RateIndicator } from 'appdoc-component'
import Hoc from '../../hoc'

import {dataArr} from './mock-data'
import './styles.css'


class Reviews extends React.Component{

    render(){


        return (

            <Hoc>
            	<Row>
            		<Col xs={24} xxl={16} className='section'>
							<ReviewsTree data={dataArr} limit={2}/>
					</Col>
					<Col xs={24} xxl={8} className='section'>
						<RateIndicator rateValue={4} reviewsNum={dataArr.length}/>
					</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Reviews;