import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import './styles.css'

import {Menu} from 'antd'
import DoctorProfileCard from '../DoctorProfileCard'
import Icon from '../Icon'
import Button from "../Button"

const SideNav = props => {

    const renderMenuItems = (menuItems) =>{
        return menuItems.map(({name, title, iconType, svg}) => {
            const path = `/${name}`;
            return (<Menu.Item key={path}>
                <NavLink exact to={path} activeClassName="selectedNavLink">
                    <div className='sidenav-root-menu-item'>
                        {iconType && <Icon type={iconType} size={26} svg={svg}/>}
                        <span className="item-title">
                            {title}
                        </span>
                    </div>
                </NavLink>
            </Menu.Item>);
        });
    };

        const {isShort, menuItems, onClick, isUser} = props;
        const rootClass = cn('sidenav-root', {'sidenav-root-short' : isShort});
        const menuClass = 'sidenav-root-menu' + (isShort ? '-short':'');

        return (
            <div className={rootClass}>
                <div className="logo" onClick={props.onLogoClick}><span className="logo-img"></span></div>
                <button onClick={onClick}
                        className="sidenav-root-btn">
                    {
                        isShort ? (
                                <Icon type="right-arrow-forward_small" size={12} svg/>
                            ) : (
                                <Icon type="left-arrow-forward_small" size={12} svg/>
                            )
                    }
                </button>
                <div className='overwlow-a-y'>
                    <DoctorProfileCard {...props}
                                        online={true}
                                       short={isShort}/>

                    <Menu
                        mode="inline"
                        className={menuClass}
                    >
                        {renderMenuItems(menuItems)}
                    </Menu>
                    {isUser && <div className="site-link"><Button
                            btnText={isShort ? "" : 'Перейти на сайт'}
                            size='go'
                            type='go'
                            icon='circle_arrow_right'
                            svg
                            onClick={props.gotoSite}
                    /></div>}
                </div>
            </div>
        )
    
}

SideNav.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        iconType: PropTypes.string,
        svg: PropTypes.bool,
        onClick: PropTypes.func,
    })),
    img: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    specialty: PropTypes.array,
    isShort: PropTypes.bool,
    isUser: PropTypes.bool,
    rateValue: PropTypes.number,
    timesRated: PropTypes.number,
    onClick: PropTypes.func,
    onLogoClick: PropTypes.func,
};

SideNav.defaultProps = {
    menuItems: [],
    isShort: false,
    isUser: false,
    timesRated: 0,
    rateValue: 0,
    name: '',
    onClick: () => {},
    onLogoClick: () => {},
};

export default SideNav;