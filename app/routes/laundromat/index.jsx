import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Button, Heading, Anchor,Card, Container, Grid, Grid_Cell, Section, StepsList,StepsSection,DashBoardForBusiness,DriverAppSection, MainPageHero, FinalCTA, SectionHeader, AppStoreButtons, Paragraph,PartnerShipCTA, PartnerBenefits, Media, Footer, MainFooter } from 'components';
import { classy } from 'utils';
import style from './style.scss';
import heroImage from '../../assets/images/laundromat-hero.jpg';
import mobileAppImage from '../../assets/images/devices.png';
import stepsImage from '../../assets/images/laundromat-detail.jpg';

export default class Laundromat extends Component {
    render() {
        var steps = [
            {
                title: 'Learn about the program',
                paragraph:'Schedule to have your items picked up and if needed, we can do same-day service.'
            },
            {
                title: 'Sign contract & setup app',
                paragraph:'Recieve push notifications every step of the way to know when to expect your items returned.'
            },
            {
                title: 'We market for you',
                paragraph:'A professional will arrive at your door at the specified time with your freshly cleaned items.'
            },
        ]

        return (
            <Page>

                <Header headerOnNextSection='true' headerOnImage='true'/>
                <MainPageHero
                    bgImage = {heroImage}
                    title = 'Reach thousands of new customers'
                    paragraph = 'We can help grow your Laundromat by increasing your presence to new potential customers.'
                    buttonText='become a partner'
                    href='#'
                    buttonBackground='linear-gradient(90deg, #9850DC 0%, #DB63A6 100%)'
                />

                <PartnerBenefits/>

                <FinalCTA
                    text="This isn't all, learn other ways that we can help by contacting us."
                    buttontext='contact us'
                    background ='#2196F3'
                />

                <DashBoardForBusiness/>

                <StepsSection
                    image={stepsImage}
                    title="Quick steps to get started"
                    steps={steps}
                    >
                    </StepsSection>

                    <DriverAppSection/>
                    
                    <PartnerShipCTA title="Start profiting as a laundromat"></PartnerShipCTA>

                </Page>
            );
        }
    }
