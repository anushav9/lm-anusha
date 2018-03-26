import React, { Component } from 'react';
import style from './style.scss';
import {Section,Container,SectionHeader, Heading,Media, Paragraph,Grid, Grid_Cell} from 'components';
import order from '../../assets/images/manage-order-icon.png';
import driver from '../../assets/images/manage-drivers-icon.png';
import notification from '../../assets/images/notification-icon.png';

export default class DashBoardForBusiness extends Component {
    render() {
        var dashboard= [
            {
                title: "Manage orders",
                paragraph:"Every order you receive can be viewed from the dashboard. With our easy to navigate features you can edit and change orders.",
                icon:order
            },
            {
                title: "Manage drivers",
                paragraph:"Keep up to date on which drivers are currently on route picking up or delivering your customer's items.",
                icon:driver

            },
            {
                title: "Push notifications",
                paragraph:"You and your customers can receive notifications on when laundry is picked up, being cleaned and out foer redelivered.",
                icon:notification
            },
        ]
        return (
            <Section type="contrast" className={style.dashboardForBusiness} size="large">
                <Container>
                    <SectionHeader align='center'>
                        <Heading kind="h2">Dashboard for the business side</Heading>
                        <Paragraph>You are in control of your business at all times when it comes to LaundryMate. The location app helps keep your workflow organized.</Paragraph>
                    </SectionHeader>
                    <Grid>
                        <Grid_Cell lg={5}>
                            <Media media= {dashboard} className={style.dashBoardMedia}/>
                        </Grid_Cell>

                        <Grid_Cell lg={7}>
                            <div className={style.dashboardForBusiness__image}>
                                <img src="../../assets/images/lmw-dashboard.jpg"/>
                            </div>
                        </Grid_Cell>
                    </Grid>

                </Container>
            </Section>
        );
    }
}
