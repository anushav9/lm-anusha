import React, { Component } from 'react';
import style from './style.scss';
import timeImage from '../../assets/images/time-icon.png';
import {Grid, Grid_Cell} from 'components';
import userHero from '../../assets/images/user-hero.jpg';
// var icon =

export default class Media extends Component {
    render() {
        return (
                    <div className={style.media}>
                        <Grid>
                            {this.props.media.map(({icon, title, paragraph}) => {
                                return (
                                    <Grid_Cell md={4} style={{margin:'20px'}}>
                                        <div>
                                             {icon &&
                                                <div><img src={icon} /></div>
                                            }
                                            <h3>{title}</h3>
                                            <p>{paragraph}</p>
                                        </div>
                                        </Grid_Cell>
                                );
                            })}
                        </Grid>
                    </div>
        );
    }
}
