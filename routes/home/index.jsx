import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Page, Header, Button, Heading, Anchor,Card, Container, Grid, Grid_Cell, Section, StepsList, MainPageHero, FinalCTA, SectionHeader, AppStoreButtons, Paragraph, Media, Footer, MainFooter } from 'components';
import { classy } from 'utils';
import style from './style.scss';
import heroImage from '../../assets/images/user-hero.jpg';
import mobileAppImage from '../../assets/images/devices.png';

export default class Home extends Component {
    render() {
        var steps = [
            {
                title: 'Schedule a pickup',
                paragraph:'Schedule to have your items picked up and if needed, we can do same-day service'
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
                paragraph:'Enjoy the convenience of not having to drive or having a conversation over the phone for your laundry to be cleaned.'
            },
            {
                title: 'Repeat orders',
                paragraph:'With our easy to use app you can create weekly or daily orders to be cleaned with your favorite laundry facility.'

            },
            {
                title: 'Guaranteed care',
                paragraph:'Each garment is special thats why we offer a variety of services as wash and fold, dry cleaning, hang dry, and tailoring.'
            },
        ]
        return (
            <Page>
                <Header></Header>
                <MainPageHero
                    className = {style.mainHomePageHero}
                    bgImage = {heroImage}
                    title = "Dry cleaning & laundry to your door"
                    paragraph = "Instead of sitting through traffic and spending too much time on the phone to have your laundry cleaned, create orders from the convenience of your home."
                    >
                        <AppStoreButtons type='navListHoriz'></AppStoreButtons>
                </MainPageHero>
                <Section className={style.section}>
                <Section className={style.mapCoverageArea}>
                    <Container>
                        <Grid>
                            <Grid_Cell sm={12} md={6} lg={7}>
                                <SectionHeader
                                    title = "Currently servicing Chicago suburbs"
                                    subtitle = "We do the work for you"
                                    >
                                </SectionHeader>
                                <Paragraph className={style.mapCoverageArea__p} color='$body-text-secondary'>Whether you are at home or out of town, LaundryMate helps you find the best laundry services, while allowing you to make purchases off of your phone.</Paragraph>
                                <Anchor className={style.mapCoverageArea__a}>See all locations</Anchor>
                            </Grid_Cell>

                            <Grid_Cell sm={12} md={6} lg={5}>
                                <div className={style.mapCoverageAreaImage}>
                                    <img  src="../../assets/images/chicago-map.jpg" alt="Chicago map"/>
                                </div>
                            </Grid_Cell>
                        </Grid>
                    </Container>
                </Section>

                <Section className={style.stepsToGetStarted}>
                    <Container>
                        <Grid>
                            <Grid_Cell sm={12} md={6} lg={4}>
                                <div className={style.stepsToGetStartedImage}>
                                    <img src="../../assets/images/user-photo.jpg" alt="user photo"/>
                                </div>
                            </Grid_Cell>
                            <Grid_Cell  sm={12} md={6} lg={8}>
                                <div className={style.stepsToGetStartedContent}>
                                    <Heading kind='h3'>Quick steps to get started</Heading>
                                    <StepsList steps={steps} />
                                </div>
                            </Grid_Cell>
                        </Grid>
                    </Container>

                </Section>
            </Section>
                <Section type="contrast" className={style.benefitsOfLm} size="large">
                    <Container>
                        <Heading kind='h2' style={{textAlign:'center'}}>Reap the benefits of LaundryMate</Heading>
                        <Media media= {media}/>

                    </Container>
                </Section>

                <FinalCTA
                     text='Are you convinced yet?First time users get $10 credit.'
                     buttontext='order online'
                     >
                </FinalCTA>

                <Section className={style.aboutTheMobileApp}>
                    <Container>
                        <Grid>
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

                                <Paragraph> With a few simple clicks you will have your clothes cleaned in no time. LaundryMate offers different features from having your clothes cleaned to tailoring, ironing and so much more.</Paragraph>
                            </div>
                            </Grid_Cell>

                        </Grid>
                    </Container>
                </Section>

                <Section className={style.servicesOfferedCards}>
                    <Container>
                        <Grid>
                            <Card
                                type="washing"
                                h3="Need washed clothes?"
                                link="Learn more"
                                href="#"
                            ></Card>
                            <Card
                                type="drycleaning"
                                h3="Need dry cleaning?"
                                link="Learn more"
                                href="#"
                            ></Card>
                            <Card
                                type="tailoring"
                                h3="Need tailoring?"
                                link="Learn more"
                                href="#"
                            ></Card>
                        </Grid>
                    </Container>
                </Section>

                <Section className={style.downloadBanner} type="banner" color="primary">
                    <Container>
                            <Heading kind='h2' color="white" weight="lighter">Download LaundryMate App</Heading>
                            <Paragraph>Our app is available for free</Paragraph>
                            <AppStoreButtons type='navListHoriz'></AppStoreButtons>
                    </Container>
                </Section>

                <Footer></Footer>

                <MainFooter></MainFooter>
            </Page>
        );
    }
}
