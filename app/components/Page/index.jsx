import React, { Component } from 'react';
import { classy } from 'utils';
import style from './style.scss';
import { Helmet, Header, Footer, MainFooter} from 'components';

export default class Page extends Component {
    render() {
        const { kind, className, children, style: inlineStyle } = this.props;

        return (
            <div
                className={classy(
                    style.page,
                    kind && style['page--' + kind],
                    className,
                )}
                style={inlineStyle}
            >
                {children}
                <Footer/>
                <MainFooter/>
            </div>
        );
    }
}
