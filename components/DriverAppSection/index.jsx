import React, { Component } from 'react';
import style from './style.scss';

import {Section,Container, Heading,SectionHeader, Paragraph,Grid, Grid_Cell, StepsList} from 'components';

export default class DriverAppSection extends Component {
    render() {
        return (
            <Section className={style.driverAppSection} size='large' >
                <Container>
                    <Grid>
                        <Grid_Cell sm={12} md={6}>
                            <div classname={style.driverAppSection__content}>
                            <SectionHeader
                                title="Comprehensive driver app"
                                subtitle="Streamline delivery"
                                >
                            </SectionHeader>
                                <Paragraph>The driver app generates fastest route for you. Therefore, saving you time and money.</Paragraph>
                            </div>
                        </Grid_Cell>
                        <Grid_Cell  sm={12} md={6}>
                            <div>
                                    <img  src="../../assets/images/driver-screens.png" alt="Mobile app screenshots"/>
                            </div>
                        </Grid_Cell>
                    </Grid>
                </Container>
            </Section>
        );
    }
}
