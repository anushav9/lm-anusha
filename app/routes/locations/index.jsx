import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Button, Heading, Anchor,Container, Grid, Grid_Cell, Section, FinalCTA, SectionHeader, Paragraph, Footer, MainFooter } from 'components';
import { classy } from 'utils';
import style from './style.scss';




export default class StayAtHome extends Component {
    render() {


        return (
            <Page>
                <Section  size='large' hasHeader='true' color='primary'>
                    <Container>

                        <Heading kind="h1" color="white">Services Near You</Heading>
                    </Container>
                </Section>


            </Page>
        );
    }
}
