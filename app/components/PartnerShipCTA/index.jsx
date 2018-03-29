import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import {Section,Container, Heading,Anchor,SectionHeader, Paragraph,Grid, Grid_Cell} from 'components';

export default class PartnerShipCTA extends Component {
    render() {
        return (
            <Section className={style.partnerShipCTA} size='huge'>
                <Container>
                    <Grid>
                        <Grid_Cell md={6}>
                            <div classname={style.driverAppSection__content}>
                            <Heading kind='h2' color='white'>{this.props.title}</Heading>
                                <Paragraph>Signing up is easy and hassle free. Join the team today!</Paragraph>
                                <Anchor className={classy(style.button, style.button__primary, style.button__large)} href="/become-a-partner">become a partner</Anchor>
                            </div>
                        </Grid_Cell>

                    </Grid>
                </Container>
            </Section>
        );
    }
}
