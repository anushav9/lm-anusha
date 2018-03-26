import React, { Component } from 'react';
import style from './style.scss';
import {Section, Container, Heading, Media, Paragraph} from 'components';
import order from '../../assets/images/manage-order-icon.png';
import driver from '../../assets/images/manage-drivers-icon.png';
import notification from '../../assets/images/notification-icon.png';

export default class PartnerBenefits extends Component {
    render() {
        var media= [
            {
                title: "Attract a new audience",
                paragraph:"Customers don't have to physically find your building to utilize your services. LaundryMate automatically matches you to customers in need of your service.",
                numberedIcon:'1'
            },
            {
                title: "Increase in sales",
                paragraph:"Our technology adds a new branch to your laundromat. A whole new revenue stream and increase in price is welcomed and expected from your customers.",
                numberedIcon:'2'
            },
            {
                title: "Built for the Modern Future",
                paragraph:"Delivery will be a defining quality of business moving forward, with convenience taking over. Busy parents and business owners will love the peace of mind.",
                numberedIcon:'3'
            },
            {
                title: "Safe and Secure",
                paragraph:"Keeping data safe and secure is one of your top priorities. We want to make sure customers can pay without worry.",
                numberedIcon:'4'
            },
            {
                title: "Promotional material",
                paragraph:"We'll handle the marketing for you by providing mailers, banners, social media posts and advertisements, as well as push notifications.",
                numberedIcon:'5'

            },
            {
                title: "Field-tested app",
                paragraph:"The technology has undergone exhaustive testing measures to ensure we have the highest quality product, and will continue to do.",
                numberedIcon:'6'
            },
        ]
        return (
            <Section size="large">
                <Container>
                    <Heading kind='h2' style={{textAlign:'center'}}>Why partner with LaundryMate</Heading>
                    <Media media= {media} md='4'/>
                </Container>
            </Section>

        );
    }
}
