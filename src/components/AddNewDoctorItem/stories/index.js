import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddNewDoctorItem from '../';

storiesOf('AddNewDoctorItem', module)
    .add('AddNewDoctorItem', () => (
        <div>
            <AddNewDoctorItem
                id={3}
                name="Иванова А. К." 
                age={35}
                avatar="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                online={true}
                onAdd = {(id) => console.log(id)}
            />

            <AddNewDoctorItem
                id={3}
                name="Иванова А. К." 
                age={35}
                avatar="https://www.proza.ru/pics/2017/06/03/1990.jpg" 
                online={true}
                isSearchItem={true}
                onAdd = {(id) => console.log(id)}
            />
        </div>
    ));