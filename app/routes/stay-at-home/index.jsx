import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Button, Heading, Anchor,Card, Container, Grid, Grid_Cell, Section,StepsSection, ServiceCoverageArea,StepsList, MainPageHero, FinalCTA, SectionHeader, AppStoreButtons,MobileAppSection, Paragraph, Media, Footer, MainFooter } from 'components';
import { classy } from 'utils';
import style from './style.scss';
import heroImage from '../../assets/images/stay-at-home-hero.jpg';
import mobileAppImage from '../../assets/images/devices.png';
import time from '../../assets/images/time-icon.png';
import repeat from '../../assets/images/repeat-icon.png';
import heart from '../../assets/images/care-icon.png';
import stepsImage from '../../assets/images/user-photo2.jpg';



export default class StayAtHome extends Component {
    render() {
        var steps = [
            {
                title: 'Schedule a pickup',
                paragraph:'Schedule to have your items picked up and if needed, we can do same-day service.'
            },
            {
                title: 'Track your order',
                paragraph:'Recieve push notifications every step of the way to know when to expect your items returned.'
            },
            {
                title: 'Fast delivery',
                paragraph:'A professional will arrive at your door at the specified time with your freshly cleaned items.'
            },
        ]

        var media= [
            {
                title: 'Saving you time',
                paragraph:'Enjoy the convenience of not having to drive or having a conversation over the phone for your laundry to be cleaned.',
                icon: time

            },
            {
                title: 'Repeat orders',
                paragraph:'With our easy to use app you can create weekly or daily orders to be cleaned with your favorite laundry facility.',
                icon: repeat
            },
            {
                title: 'Guaranteed care',
                paragraph:'Each garment is special thats why we offer a variety of services as wash and fold, dry cleaning, hang dry, and tailoring.',
                icon: heart
            },
        ]
        return (
            <Page>
                <Header headerOnNextSection='true' headerOnImage='true'/>
                <MainPageHero
                    bgImage = {heroImage}
                    title = "Dry cleaning & laundry to your door"
                    paragraph ="LaundryMate allows you to create orders from the convenience of your home and spend time on what matters most in your life."
                    >
                        <AppStoreButtons type='horiz'></AppStoreButtons>
                    </MainPageHero>

                    <Section>

                        <ServiceCoverageArea
                            text="As a stay at home parent it can be tough to get the kids out of the house and into car. Running errands with children can be difficult at times, that is why we want to take away some of the stress in your life. With LaundryMate, you can create laundry orders off of your phone and not ever have to leave your house."
                            >
                            </ServiceCoverageArea>


                            <StepsSection
                                image={stepsImage}
                                title="Quick steps to get started"
                                steps={steps}
                                >
                                </StepsSection>
                            </Section>

                            <Section type="contrast" className={style.benefitsOfLm} size="large">
                                <Container>
                                    <Heading kind='h2' style={{textAlign:'center'}}>Reap the benefits of LaundryMate</Heading>
                                    <Media media= {media} md='4'/>
                                </Container>
                            </Section>

                            <FinalCTA
                                text='Are you convinced yet? First time users get $10 credit.'
                                buttontext='order online'
                                background ='linear-gradient(270deg, #4DD0E1 0%, #2196F3 100%)'
                                >
                                </FinalCTA>
                                <MobileAppSection></MobileAppSection>



                                <Section type="banner" color="primary">
                                    <Container>
                                        <Heading kind='h2' color="white" weight="lighter">Download LaundryMate App</Heading>
                                        <Paragraph>Our app is available for free</Paragraph>
                                        <AppStoreButtons type='horiz'></AppStoreButtons>
                                    </Container>
                                </Section>


                            </Page>
                        );
                    }
                }
