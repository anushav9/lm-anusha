import React, { Component } from 'react';
import { classy } from 'utils';
import style from './style.scss';
import { Section, Container, Grid, Grid_Cell, SectionHeader, Form, Input, Button} from 'components';


export default class GetNotified extends Component {

    render() {
        return (
            <Section size='huge' className={style.section__getNotified} style={{ background:`url(${this.props.bgImage})`, backgroundSize:`${this.props.bgSize}`}}>
                <Container>
                    <Grid>
                        <Grid_Cell md={4}>
                            <SectionHeader
                                title="Didn't see your town?"
                                subtitle="Find out when we've reached your area"
                                >
                                </SectionHeader>
                            </Grid_Cell>

                            <Grid_Cell md={8}>
                                <Form>
                                    <Grid className={style.grid}>
                                        <Grid_Cell xs={6} md={6}>
                                            <Input type='email' placeholder='Email address' required='true' large='true' className={style.input}></Input>
                                        </Grid_Cell>

                                        <Grid_Cell xs={6} md={6} xl={3}>
                                            <Input type='number' placeholder='Zip Code' required='true' large='true' className={style.input}></Input>
                                        </Grid_Cell>

                                        <Grid_Cell xl={3} className={style.button__notified}>
                                            <Button large='true' cta='true' style={{ background:'linear-gradient(270deg, #4DD0E1 0%, #2196F3 100%)',margin:0}} href='#'>get notified</Button>
                                        </Grid_Cell>
                                    </Grid>
                                </Form>
                            </Grid_Cell>

                        </Grid>
                    </Container>
                </Section>


            );
        }
    }
