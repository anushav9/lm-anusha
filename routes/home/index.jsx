import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Button, Heading, Anchor,Card, Container, Grid, Grid_Cell, Section,StepsSection,ServiceCoverageArea, StepsList, MainPageHero, FinalCTA, SectionHeader, AppStoreButtons, Paragraph, Media, Footer, MainFooter } from 'components';
import { classy } from 'utils';
import style from './style.scss';
import heroImage from '../../assets/images/user-hero.jpg';
import mobileAppImage from '../../assets/images/devices.png';
import time from '../../assets/images/time-icon.png';
import repeat from '../../assets/images/repeat-icon.png';
import heart from '../../assets/images/care-icon.png';
import stepsImage from '../../assets/images/user-photo.jpg';



export default class Home extends Component {
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
                <MainPageHero
                    bgImage = {heroImage}
                    title = "Dry cleaning & laundry to your door"
                    paragraph = "Instead of sitting through traffic and spending too much time on the phone to have your laundry cleaned, create orders from the convenience of your home."
                    >
                        <AppStoreButtons type='horiz'></AppStoreButtons>
                    </MainPageHero>

                    <Section>

                            <ServiceCoverageArea
                                text="Whether you are at home or out of town, LaundryMate helps you find the best laundry services, while allowing you to make purchases off of your phone."
                                >
                                </ServiceCoverageArea>

                            <StepsSection
                                image={stepsImage}
                                heading="Quick steps to get started"
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

                                <Section className={style.aboutTheMobileApp}>
                                    <Container>
                                        <Grid className={style.grid}>
                                            <Grid_Cell sm={12} md={6}>
                                                <div className={style.aboutTheMobileApp__image}>
                                                    <img  src="../../assets/images/devices.png" alt="Mobile app screenshots"/>
                                                </div>
                                            </Grid_Cell>

                                            <Grid_Cell sm={12} md={6}>
                                                <div className={style.aboutTheMobileApp__content}>
                                                    <SectionHeader
                                                        title="Simple and easy process"
                                                        subtitle="Schedule in seconds"
                                                        >
                                                        </SectionHeader>

                                                        <Paragraph>With a few simple clicks you will have your clothes cleaned in no time. LaundryMate offers different features from having your clothes cleaned to tailoring, ironing and so much more.</Paragraph>
                                                    </div>
                                                </Grid_Cell>

                                            </Grid>
                                        </Container>
                                    </Section>

                                    <Section className={style.servicesOfferedCards} size="large">
                                        <Container>
                                            <Grid className={style.card__row}>
                                                <Card
                                                    type="washing"
                                                    title="Need washed clothes?"
                                                    link="Learn more"
                                                    href="#"
                                                    ></Card>
                                                    <Card
                                                        type="drycleaning"
                                                        title="Need dry cleaning?"
                                                        link="Learn more"
                                                        href="#"
                                                        ></Card>
                                                        <Card
                                                            type="tailoring"
                                                            title="Need tailoring?"
                                                            link="Learn more"
                                                            href="#"
                                                            ></Card>
                                                        </Grid>
                                                    </Container>
                                                </Section>

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
