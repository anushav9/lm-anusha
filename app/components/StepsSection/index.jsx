import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import {Section,Container, Heading, Paragraph,Grid, Grid_Cell, StepsList} from 'components';

export default class StepsSection extends Component {
    static propTypes = {
        title: PropTypes.string
    }

    render() {
        return (
            <Section className={style.stepsToGetStarted}>
                <Container>
                    <Grid>
                        <Grid_Cell sm={12} md={6} lg={5}>
                            <div className={style.image}>
                                <img src={this.props.image}/>
                            </div>
                        </Grid_Cell>
                        <Grid_Cell  sm={12} md={6} lg={7}>
                            <div className={style.stepsToGetStarted__content}>
                                <Heading kind='h3'>{this.props.title}</Heading>
                                <StepsList steps={this.props.steps}/>
                            </div>
                        </Grid_Cell>
                    </Grid>

                </Container>
            </Section>
        );
    }
}
