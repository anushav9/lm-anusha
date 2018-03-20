import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Heading, Button, AppStoreButtons } from 'components';

export default class Header extends Component {

    render() {

        return (
            <header className={classy(style.header, style.headerOnNextSection, style.headerOnImage)}>
                <Container className={style.container}>
                    <div className={style.header__logo}>
                        <img className={style.logo} src="../../assets/images/logo_white.png" alt="LaundryMate"/>
                    </div>

                    <div className={style.header__nav}>
                        <div className={style.header__navList}>
                            <ul className={classy(style.navList, style.navListHoriz)}>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="#">Locations</a>
                                </li>
                                <li className={classy(style.navList__item, style.navList__item__disabled)}>
                                    <a className={style.navList__link} href="#">Order</a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="#"> Partner Login</a>
                                </li>
                                <li className={classy(style.navList__item, style.navList__item__button)}>
                                    <a className={classy(style.button, style.button__primary)} href="#">Download</a>
                                </li>
                            </ul>
                        </div>

                        {/* <div className={style.header__navToggle}>
                            <a href="#" onclick="toggleMenu()"><i className={classy(mdi, mdi-menu, header__navToggle__icon)}></i></a>
                        </div> */}

                    </div>

                </Container>
            </header>

        );
    }
}
