import React, { Component } from 'react';
import style from './style.scss';

export default class StepsList extends Component {
    render() {
        return (
            <div className={style.list}>
                <ul className={style.ul}>
                    {this.props.steps.map(({title, paragraph}) => {
                        return (
                            <li className={style.item}>
                                <h4>{title}</h4>
                                <p>{paragraph}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
