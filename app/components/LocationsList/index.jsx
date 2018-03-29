import React, { Component } from 'react';
import style from './style.scss';
import { Grid, Grid_Cell, SectionHeader} from 'components';


export default class LocationsList extends Component {

    render() {
        return (
            <Grid_Cell sm={6} md={4} className={style.grid__cell}>
                {this.props.children}
            </Grid_Cell>


        );
    }
}
