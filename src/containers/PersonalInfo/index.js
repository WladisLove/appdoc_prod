import React from 'react'

import { Icon, Row, Col, PersonalContact, PersonalEducation, PersonalExperience, PersonalInformation } from 'appdoc-component'
import Hoc from '../../hoc'

import './styles.css'
class PersonalInfo extends React.Component{

    render(){

        return (

            <Hoc>
            	<Row>
            		<Col span={18}>
            			<PersonalContact 
			                secondname="Иванова" 
			                firstname="Иван" 
			                patronymic="Иванович" 
			                phone="+375 29 111 11 11" 
			                email="test@test.com" 
			                oldPassword="1111" 
			                newPassword="" 
			            />
            		</Col>
            	</Row>
            	<Row>
            		<Col span={18}>
            			<PersonalEducation 
			                mainInstitution="Белорусский государственный медицинский университет" 
			                mainSpecialty="Факультет стоматологии. Стоматолог" 
			                secondInstitution="Медицинский университет Lorem ipsum dolor sit amet" 
			                secondSpecialty="Курс стоматологии. Стоматолог"
			                mainDateStart="30.07.2012"
			                mainDateEnd="30.07.2018"
			                dateStart="30.07.2012"
			                dateEnd="30.07.2018"
			                degree="Кандидат медицинских наук"
			            />
            		</Col>
            	</Row>
            	<Row>
            		<Col span={18}>
            			<PersonalExperience 
			                post="Стоматолог"
			                placeOfWord="Мед центр «Lorem ipsum dolor sit amet»"
			                dateStart="2011"
			                expWork="10"
			            />
            		</Col>
            	</Row>
            	<Row>
            		<Col span={18}>
            			<PersonalInformation 
			                langData={['Английский', 'Русский', 'Немецкий', 'Японский']}
			                priceData={['50 - 100 руб', '100 - 200 руб', '200 - 500 руб', '500 - 1000 руб']}
			            />
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default PersonalInfo;