import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Heading, Anchor,Container, Grid, Grid_Cell, Section, SectionHeader, ContactForm} from 'components';
import { classy } from 'utils';
import style from './style.scss';
import getNotified__background from '../../assets/images/locations-map.png';
export default class BecomeAPartner extends Component {
    render() {


        return (
            <Page>
                <Section color='primary'>
                    <Container>
                        <Heading kind="h1" color="white" className={style.heading}>Become a Partner</Heading>
                    </Container>
                </Section>

                <ContactForm></ContactForm>

            </Page>
        );
    }
}
