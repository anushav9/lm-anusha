import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Heading, Paragraph, Button, Grid, Grid_Cell, AppStoreButtons } from 'components';

export default class Footer extends Component {

    render() {

        return (
            <Section className={style.footer} type="contrast" size="large">
                <Container>
                    <Grid>

                        <Grid_Cell className={style.footer__item} sm={6} md={3}>

                            <img className={style.footer__logo} src="../../assets/images/logo_white.png" alt="LaundryMate"/>

                            <Paragraph style={{marginBottom:'0'}}>Laundry and dry-cleaning on demand, delivered right to your door.</Paragraph>
                            <div className={style.socialMediaIcons}>
                                <ul className={classy(style.navList,style.horiz,this.props.className)}>
                                    <li className={classy(style.navList__item, style.socialMediaIcons__item__facebook)}>
                                        <a className={style.navList__link} href="https://www.facebook.com/LaundryMate-486250308423066/" target="_blank"><img src="../../assets/images/find-us-on-facebook.svg"/></a>
                                    </li>
                                </ul>
                            </div>
                        </Grid_Cell>

                    <Grid_Cell className={style.footer__item} sm={6} md={3}>
                        <Heading kind='h4'>LaundryMate</Heading>
                        <div>
                            <ul className={style.navList}>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="/laundromat">Laundromat</a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="/dry-cleaner">Dry Cleaner</a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className= {style.navList__link} href="/tailor">Tailor</a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="/locations">Locations</a>
                                </li>
                            </ul>
                        </div>
                    </Grid_Cell>

                    <Grid_Cell className={style.footer__item} sm={6} md={3}>
                        <Heading kind='h4'>Partners</Heading>
                        <div>
                            <ul  className={style.navList}>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="https://dashboard.laundrymate.io/">Partner Login</a>
                                </li>
                                <li className={style.navList__item}>
                                    <a className={style.navList__link} href="/become-a-partner">Become a Partner</a>
                                </li>
                            </ul>
                        </div>
                    </Grid_Cell>

                    <Grid_Cell className={style.footer__item} sm={6} md={3}>
                        <Heading kind='h4'>Get the App</Heading>
                        <AppStoreButtons></AppStoreButtons>
                    </Grid_Cell>

                </Grid>
            </Container>
        </Section>


    );
}
}
