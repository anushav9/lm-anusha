import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';

export default class NavList extends Component {

    render() {
        return (
            <ul className={style.navList}>
                <li className={style.navList__item}>
                    <Anchor className={style.navList__link} href={this.props.href}>
                    {this.props.children}
                    </Anchor>
                </li>
            </ul>
        );
    }
}
