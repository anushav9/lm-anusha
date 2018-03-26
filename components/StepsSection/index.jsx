import React, { Component } from 'react';
import style from './style.scss';
import {Section,Container, Heading, Paragraph,Grid, Grid_Cell, StepsList} from 'components';

export default class StepsSection extends Component {
    render() {
        return (
            <Section className={style.stepsToGetStarted}>
                <Container>
                    <Grid>
                        <Grid_Cell sm={12} md={6} lg={4}>
                            <div className={style.stepsToGetStarted__image}>
                                <img src={this.props.image} alt="user photo"/>
                            </div>
                        </Grid_Cell>
                        <Grid_Cell  sm={12} md={6} lg={8}>
                            <div className={style.stepsToGetStarted__content}>
                                <Heading kind='h3'>{this.props.heading}</Heading>
                                <StepsList steps={this.props.steps}/>
                            </div>
                        </Grid_Cell>
                    </Grid>
                </Container>
            </Section>
        );
    }
}
