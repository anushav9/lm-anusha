import React, { Component } from 'react';
import { Heading, Anchor } from 'components';
import style from './style.scss';

export default class ErrorScreen extends Component {
    render() {
        return (
            <div className={style.error}>
                <img alt="error" className={style.image} src="https://media.audent.io/media/file/2141/error.png" width="200" />
                <Heading kind="h1">Uh oh!</Heading>
                <p>
                    Something went wrong. Please try again later or <Anchor href="/contact">contact us.</Anchor>
                </p>
            </div>
        );
    }
}
