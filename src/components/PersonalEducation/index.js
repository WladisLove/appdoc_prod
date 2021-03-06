import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Accordion from '../Accordion'
import PersonalEducationItem from '../PersonalEducationItem'
import Input from '../Input'
import Rate from '../Rate'
import Icon from '../Icon'
import Popover from '../Popover'
import { Translate } from 'react-localize-redux'
import {profileDoctor} from '../PersonalContactItem/mock-data'

import './style.css'
import '../../icon/style.css'

class PersonalEducation extends React.Component{

    render(){
       const rootClass = cn('personal-education-all');
        const Panel = Accordion.Panel;
        return (
            <div className={rootClass}>
                <Accordion defaultActiveKey={['1']}>
                    <Panel header={<Translate id={"education"}/>} key="1">
                        <PersonalEducationItem
                            profileDoctor={this.props.profileDoctor}
                            onSubmit={this.props.onSubmit}
                            uploadFile={this.props.uploadFile}
                            docSpecialities={this.props.docSpecialities}
                        />
                    </Panel>
                </Accordion>
            </div>
        )
    }
}

PersonalEducation.propTypes = {
    profileDoctor: PropTypes.object,
    onSubmit: PropTypes.func,
    docSpecialities: PropTypes.array
};

PersonalEducation.defaultProps = {
    profileDoctor: {},
    onSubmit: () => {}
};

export default PersonalEducation
