import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import ReactScrollbar from "react-perfect-scrollbar"
import { Translate } from 'react-localize-redux'

import './styles.css'

import {Menu} from 'antd'
import DoctorProfileCard from '../DoctorProfileCard'
import Icon from '../Icon'
import Button from "../Button"

const SideNav = props => {
    const renderMenuItems = (menuItems) => {
        return menuItems.map(({name, title, iconType, svg}) => {
            const path = `/${name}`;
            return (<Menu.Item key={path}>
                        <NavLink exact to={path} activeClassName="selectedNavLink">
                            <Translate>
                                {({ translate }) =>
                                    (<div className='sidenav-root-menu-item'>
                                        {iconType && <Icon type={iconType} size={26} svg={svg} title={translate(title)}/>}
                                            <span className="item-title">
                                                {translate(title)}
                                            </span>
                                    </div>)
                                }
                            </Translate>
                        </NavLink>
                    </Menu.Item>);
        });
    };

        const {isShort, menuItems, onClick, isUser} = props;
        const rootClass = cn('sidenav-root', {'sidenav-root-short' : isShort});
        const menuClass = 'sidenav-root-menu' + (isShort ? '-short':'');
        const shouldScroll = window.innerHeight < 900;
        return (
            <div className={rootClass}>
                <div className="logo" onClick={props.onLogoClick}><span className="logo-img"></span></div>
                <ReactScrollbar
                    className="scrollableSideNav"
                    option={{suppressScrollX: true,
                        wheelPropagation: false}}

                >
                    <div className='overwlow-a-y'>
                        <DoctorProfileCard {...props}
                                            online={true}
                                           short={isShort}

                        />

                        <Menu
                            mode="inline"
                            className={menuClass}
                        >
                            {renderMenuItems(menuItems)}
                        </Menu>
                    </div>
                </ReactScrollbar>
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
