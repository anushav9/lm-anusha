import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import {Heading,Form,Container,Input,Section,SectionHeader,Select,Checkbox, Paragraph, Grid, Grid_Cell, Anchor} from 'components';

export default class ContactForm extends Component {
    render() {
        var options=[
            {
                face:'Alabama',
                value:'Alabama'
            },
            {
                face:'Californina',
                value:'Californina'
            }

        ]
        return (
            <Form className={style.form}>
                <Container>
            <Section>
            <SectionHeader hasBorder='true' title='Primary Contact Details'></SectionHeader>

                <Grid>
                    <Grid_Cell md={6}>
                        <Input type='text' placeholder='First Name' required='true' large='true' className={style.input}></Input>
                    </Grid_Cell>

                    <Grid_Cell md={6}>
                        <Input type='text' placeholder='Last Name' required='true' large='true' className={style.input}></Input>
                    </Grid_Cell>

                    <Grid_Cell md={6}>
                        <Input type='email' placeholder='Email Address' required='true' large='true' className={style.input}></Input>
                    </Grid_Cell>

                    <Grid_Cell md={6}>
                        <Input type='number' placeholder='Phone Number' required='true' large='true' className={style.input}></Input>
                    </Grid_Cell>
                </Grid>

        </Section>

        <Section>
        <SectionHeader hasBorder='true' title='Business Details'></SectionHeader>

            <Grid>
                <Grid_Cell md={6}>
                    <Input type='text' placeholder='Company Name' required='true' large='true' className={style.input}></Input>
                </Grid_Cell>

                <Grid_Cell md={6}>
                    <Input type='text' placeholder='Company Website or Yelp Page' required='true' large='true' className={style.input}></Input>
                </Grid_Cell>

                <Grid_Cell md={4}>
                    <Input type='text' placeholder='City' required='true' large='true' className={style.input}></Input>
                </Grid_Cell>

                <Grid_Cell md={4}>
                    <Select options={options} large='true' className={classy(style.input, style.select)}></Select>
                </Grid_Cell>

                <Grid_Cell md={4}>
                    <Input type='number' placeholder='Zip Code' required='true' large='true' className={style.input}></Input>
                </Grid_Cell>
            </Grid>

    </Section>

    <Section>

        <Form>
            <Heading kind="h3">What services do you provide?</Heading>
            <Grid className={style.checkbox__grid}>
                <Grid_Cell md={4}>
                    <Checkbox checked='true'>Wash & Fold</Checkbox>
                </Grid_Cell>

                <Grid_Cell md={4}>
                    <Checkbox>Dry Cleaning</Checkbox>
                </Grid_Cell>

                <Grid_Cell md={4}>
                    <Checkbox>Tailoring</Checkbox>
                </Grid_Cell>
            </Grid>
            <div className={style.form__footer}>
            <span>A team member will be in contact with you in 2-3 business days. Thank you for your patience.</span>
            <Anchor className={classy(style.button, style.button__cta,style.button__large,style.button__submit)}  href='#'>submit</Anchor>
        </div>
        </Form>
    </Section>
    </Container>
        </Form>
        );
    }
}
