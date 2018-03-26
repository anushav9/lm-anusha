import React, { Component } from 'react';
import style from './style.scss';
import {Section,Container, Heading, Paragraph, Anchor, Grid, Grid_Cell, SectionHeader} from 'components';

export default class StepsSection extends Component {
    render() {
        return (
            <Section className={style.mapCoverageArea}>
                <Container>
                    <Grid>
                        <Grid_Cell sm={12} md={6} lg={7}>

                            <SectionHeader
                                title = "Currently servicing Chicago suburbs"
                                subtitle = "We do the work for you"
                                >
                                </SectionHeader>
                                <div className={style.mapCoverageArea__content}>
                                    <Paragraph color='$body-text-secondary'>{this.props.text}</Paragraph>
                                </div>
                                <div className={style.mapCoverageArea__footer}>
                                    <Anchor>See all locations <i className="mdi mdi-chevron-right"></i></Anchor>
                                </div>

                            </Grid_Cell>

                            <Grid_Cell sm={12} md={6} lg={5}>
                                <div className={style.mapCoverageArea__image}>
                                    <img  src="../../assets/images/chicago-map.jpg" alt="Chicago map"/>
                                </div>
                            </Grid_Cell>
                        </Grid>
                    </Container>
                </Section>
        );
    }
}
