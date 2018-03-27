import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Heading,Anchor,Grid,Grid_Cell} from 'components';

export default class Card extends Component {
    render() {

        return (
            <a href={this.props.link}>
            <Grid_Cell md={4} style={{padding:'0px 15px'}}>

                <div style={this.props.style}  className={classy(this.props.className, style.card,
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
                                <Anchor className={style.card__link} href={this.props.href}>{this.props.link} <i className="mdi mdi-chevron-right"></i></Anchor>
                            </div>

                        </div>

                    </Grid_Cell>
                    </a>
                );
            }
        }
