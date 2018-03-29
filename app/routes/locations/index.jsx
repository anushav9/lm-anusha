import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Heading, Anchor,Container, ServiceLocations, LocationsList, Grid, Grid_Cell, Section, SectionHeader, GetNotified} from 'components';
import { classy } from 'utils';
import style from './style.scss';
import getNotified__background from '../../assets/images/locations-map.png';
export default class Locations extends Component {
    render() {


        return (
            <Page>
                <Header/>
                <Section  size='large' color='primary'>
                    <Container>

                        <Heading kind="h1" color="white">Services Near You</Heading>
                    </Container>
                </Section>

                <ServiceLocations></ServiceLocations>
                <GetNotified bgImage={getNotified__background} bgSize='cover'></GetNotified>
            </Page>
        );
    }
}
