import React, { Component } from 'react';
import style from './style.scss';

import {Section,Container, Heading,SectionHeader, Paragraph,Grid, Grid_Cell, StepsList} from 'components';

export default class MobileAppSection extends Component {
    render() {
        return (
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

        );
    }
}
