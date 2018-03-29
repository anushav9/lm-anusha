import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Heading, Button, AppStoreButtons} from 'components';



export default class Header extends Component {

    static propTypes = {
        children: PropTypes.any,
        headerOnNextSection: PropTypes.bool,
        headerOnImage: PropTypes.bool,
    }

    // static defaultProps = {
    //     kind: 'h1',
    //     upper: false,
    // }
    //
    constructor() {
        super();
        this.state = {
            responsiveMenu: false,
        };
    }

    responsiveMenu = () => {
        this.setState({
            responsiveMenu: true,
        });
    }

    closeMenu = () => {
        this.setState({
            responsiveMenu: false,
        });
    }


    render() {

        return (
            <header className={classy(style.header, this.props.headerOnNextSection && style.headerOnNextSection, this.props.headerOnImage && style.headerOnImage, this.state.responsiveMenu && style.responsiveMenu)}>
                <div className={style.mask} onClick={this.closeMenu} />
                <Container className={style.container}>

                    <div className={style.header__logo}>
                    <a href="/"><img className={style.logo} src="../../assets/images/logo_white.png" alt="LaundryMate"/></a>
                    </div>

                    <div className={style.header__nav} id="navHeader">
                        <div className={classy(style.header__navList)}>
                            <ul className={classy(style.navList, style.horiz)}>

                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="/locations">Locations</a>
                                </li>
                                <li className={classy(style.navList__item, style.navList__item__disabled)}>
                                    <a className={classy(style.navList__link, style.tooltip)} href="#">Order<span className={style.tooltiptext}>comming soon</span></a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="https://dashboard.laundrymate.io/"><i className="mdi mdi-lock"></i> Partner Login</a>
                                </li>
                                <li className={classy(style.navList__item, style.navList__item__button)}>
                                    <a className={classy(style.button, style.button__primary)} href="#">Download</a>
                                </li>
                            </ul>
                        </div>

                        <div className={style.header__navToggle}>
                            <a href="#" className={style.header__navToggle__icon} onClick={this.responsiveMenu}><i className="mdi mdi-menu"></i></a>
                        </div>

                    </div>

                </Container>
            </header>

        );
    }
}
