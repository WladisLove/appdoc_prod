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
            		<Col span={16}>
							<ReviewsTree data={dataArr} limit={2}/>
					</Col>
					<Col span={8}>
						<RateIndicator rateValue={4} reviewsNum={dataArr.length}/>
					</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Reviews;