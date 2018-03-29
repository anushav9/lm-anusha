import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import style from './style.scss';
import { classy } from 'utils';
import { Heading,Anchor} from 'components';
import { withRouter } from 'react-router-dom';

@withRouter
export default class Card extends Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        href: PropTypes.string
    }
    render() {

        return (

            <div style={this.props.style} onClick={() => this.props.history.push(this.props.href)} className={classy(this.props.className, style.card,
                this.props.type == 'washing' && style.card__washing,
                this.props.type == 'drycleaning' && style.card__drycleaning,
                this.props.type == 'tailoring' && style.card__tailoring)}
                >
                    <div className={classy(this.props.className, style.card__header)}>
                        <div className={style.card__media}>
                            <div className={classy(this.props.className, style.icon,
                                this.props.type=='washing' && style.icon__washing,
                                this.props.type=='drycleaning' && style.icon__drycleaning,
                                this.props.type=='tailoring' && style.icon__tailoring)}
                            />
                        </div>
                    </div>
                    <div className={style.card__content}>
                        <Heading className={style.card__title} kind="h3">{this.props.title}</Heading>
                    </div>

                    <div className={style.card__footer}>
                        <span className={style.card__link}>{this.props.link} <i className="mdi mdi-chevron-right"></i></span>
                    </div>

                </div>
            );
        }
    }
