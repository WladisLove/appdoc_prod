import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Router, Route, Switch } from 'react-router'
import { MemoryRouter } from 'react-router';


import SideNav from '../';
import {menuItems, menuItemsUser} from './mock-data'

storiesOf('SideNav', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('doc', () => (
        <div style={{height: 500}}>
            {/*<div style={{backgroundColor:'yellow',height:50, padding:15}}>Top panel with Logo</div>*/}
            <SideNav menuItems={menuItems}
                     img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                     name='Ивано Иван Иванович'
                     specialty={["терапевт","хирург","Массажист"]}
                     rateValue={2}
                     timesRated={34}
                     onLogoClick = {() => {console.log('logo click')}}
                     online/>
        </div>
    ))
    .add('doc small', () => (
    <div style={{height: 500}}>
        {/*<div style={{backgroundColor:'yellow',height:50, padding:15}}>Top panel with Logo</div>*/}
        <SideNav menuItems={menuItems}
                 img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                 name='Ивано Иван Иванович'
                 specialty={["терапевт","хирург"]}
                 rateValue={4}
                 timesRated={34}
                 isShort={true}
                 online/>
    </div>
))
.add('user', () => (
    <div style={{height: 500}}>
        {/*<div style={{backgroundColor:'yellow',height:50, padding:15}}>Top panel with Logo</div>*/}
        <SideNav menuItems={menuItemsUser}
                 img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                 name='Иванasdfafо Иван Иванович'
                 specialty={["терапевт","хирург","Массажист"]}
                 rateValue={2}
                 isUser = {true}
                 gotoSite={() => console.log("goto site")}
                 timesRated={34}
                 onLogoClick = {() => {console.log('logo click')}}
                 online/>
    </div>
))
.add('user small', () => (
    <div style={{height: 500}}>
        {/*<div style={{backgroundColor:'yellow',height:50, padding:15}}>Top panel with Logo</div>*/}
        <SideNav menuItems={menuItemsUser}
                 img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                 name='Иваноdfghjkl Иван Иванович'
                 specialty={["терапевт","хирург","Массажист"]}
                 rateValue={2}
                 isUser ={true}
                 timesRated={34}
                 onLogoClick = {() => {console.log('logo click')}}
                 isShort={true}
                 online/>
    </div>
));