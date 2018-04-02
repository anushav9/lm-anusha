import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import {Section,Container, Heading, Button, SectionHeader, Paragraph, Grid, Grid_Cell} from 'components';

export default class PartnerShipCTA extends Component {
    render() {
        return (
            <Section className={style.partnerShipCTA} size='huge'>
                <Container>
                    <Grid>
                        <Grid_Cell md={6}>
                            <div className={style.driverAppSection__content}>
                            <Heading kind='h2' color='white'>{this.props.title}</Heading>
                                <Paragraph className={style.paragraph}>Signing up is easy and hassle free. Join the team today!</Paragraph>
                                <Button large='true' primary='true' href="/become-a-partner">become a partner</Button>
                            </div>
                        </Grid_Cell>

                    </Grid>
                </Container>
            </Section>
        );
    }
}
