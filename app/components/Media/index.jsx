import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import timeImage from '../../assets/images/time-icon.png';
import {Heading, Paragraph,Grid, Grid_Cell} from 'components';
import userHero from '../../assets/images/user-hero.jpg';

export default class Media extends Component {
    render() {
        return (
            <Grid>
                {this.props.media.map(({icon,numberedIcon, title, paragraph}) => {
                    return (
                        <Grid_Cell md={this.props.md} sm={this.props.sm}>
                            <div className={style.media}>
                                {icon &&
                                    <div className={style.media__object}>
                                        <div className={style.icon}><img src={icon}/></div>
                                    </div>
                                }
                                {numberedIcon &&
                                    <div className={style.media__object}>
                                        <span className={classy(style.icon, style.icon__number)}>{numberedIcon}</span>
                                    </div>
                                }
                                <div className={style.media__content}>
                                    <Heading kind='h3'>{title}</Heading>
                                    <Paragraph>{paragraph}</Paragraph>
                                </div>
                            </div>
                        </Grid_Cell>
                    );
                })}
            </Grid>
        );
    }
}
