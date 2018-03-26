import React, { Component } from 'react';
import style from './style.scss';
import {Heading, Paragraph} from 'components';

export default class StepsList extends Component {
    render() {
        return (
            <div className={style.list}>
                <ul className={style.ul}>
                    {this.props.steps.map(({title, paragraph}) => {
                        return (
                            <li className={style.item}>
                                <Heading kind="h4">{title}</Heading>
                                <Paragraph>{paragraph}</Paragraph>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
