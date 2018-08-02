import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientTableItem from '../';

storiesOf('PatientTableItem', module)
    .add('PatientTableItem', () => (
        <div>
            <PatientTableItem 
                img="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                name="Иванова А. К." 
                age="37" 
                dateend = {0}
                datestart ={0}
                id={2663}
                id_zap= {0}
                onGoto={()=>console.log('click')}
                setModal1Visible ={(isVisible, id, name)=>
                    console.log("setModal1Visible", "isVisible:", isVisible, "id", id, "name", name)}
                setModal2Visible ={(isVisible, id, name)=>
                    console.log("setModal2Visible", "isVisible:", isVisible, "id", id, "name", name)}
            />
        </div>
    ))