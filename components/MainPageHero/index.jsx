import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Heading, Paragraph, Button, Grid, Grid_Cell} from 'components';

export default class MainPageHero extends Component {
     render() {
        const { className, children, style: inlineStyle } = this.props;

        return (
                <Section hasHeader='true' size='huge' type='contrast' style={{ background: `url(${this.props.bgImage})`, backgroundSize:`${this.props.bgImage}` }} className={classy(style.mainHomePageHero, this.props.className)}>
                    <Container>
                        <Grid>
                            <Grid_Cell sm={12} md={6} lg={6}>
                                <Heading kind="h1" color="white">{this.props.title}</Heading>
                                <Paragraph color="white">{this.props.paragraph}</Paragraph>
                                {this.props.buttonText &&
                                    <Button href={this.props.href} large={true} className={style.red}>{this.props.buttonText}</Button>
                                }
                                {this.props.children}
                            </Grid_Cell>
                        </Grid>
                    </Container>
                </Section>
        );
   }
}
