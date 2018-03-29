import React, { Component } from 'react';
import style from './style.scss';
import {Section,Container, Heading,SectionHeader, Paragraph,Grid, Grid_Cell} from 'components';

export default class ServiceLocations extends Component {
    render() {
        return (
            <Section size='large'>
                <Container>
                    <Grid gutter='45'>
                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader hasBorder='true' title='Dekalb County'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Clinton</li>
                                                <li className={style.navList__item}>Dekalb</li>
                                                <li className={style.navList__item}>Genoa</li>
                                                <li className={style.navList__item}>Sycamore</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>

                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader title='DuPageCounty' hasBorder='true'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Aurora</li>
                                                <li className={style.navList__item}>Naperville</li>
                                                <li className={style.navList__item}>St. Charles</li>
                                                <li className={style.navList__item}>West Chicago</li>
                                            </ul>
                                        </Grid_Cell>

                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Wheaton</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>

                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader title='Kane County' hasBorder='true'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Aurora</li>
                                                <li className={style.navList__item}>Elgin</li>
                                                <li className={style.navList__item}>Geneva</li>
                                                <li className={style.navList__item}>St. Charles</li>
                                            </ul>
                                        </Grid_Cell>

                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>East Dundee</li>
                                                <li className={style.navList__item}>West Dundee</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>

                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader title='McHenry County' hasBorder='true'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Crystal Lake</li>
                                                <li className={style.navList__item}>Harvard</li>
                                                <li className={style.navList__item}>Marengo</li>
                                                <li className={style.navList__item}>McHenry</li>
                                            </ul>
                                        </Grid_Cell>

                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Woodstock</li>
                                                <li className={style.navList__item}>Huntley</li>
                                                <li className={style.navList__item}>Algonquin</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>

                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader title='Winnebago County' hasBorder='true'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Loves Park</li>
                                                <li className={style.navList__item}>Rockford</li>
                                                <li className={style.navList__item}>South Beloit</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>

                        <Grid_Cell sm={6} md={4}>
                            <SectionHeader title='Boone County' hasBorder='true'></SectionHeader>
                            <div className={style.section__content}>
                                <div className={style.navList}>
                                    <Grid>
                                        <Grid_Cell sm={6}>
                                            <ul>
                                                <li className={style.navList__item}>Belvidere</li>
                                                <li className={style.navList__item}>Poplar Grove</li>
                                            </ul>
                                        </Grid_Cell>
                                    </Grid>
                                </div>
                            </div>
                        </Grid_Cell>
                    </Grid>
                </Container>
            </Section>
        );
    }
}
