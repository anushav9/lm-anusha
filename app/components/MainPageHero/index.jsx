import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Heading, Paragraph, Button, Grid, Grid_Cell} from 'components';

export default class MainPageHero extends Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        backgroundSize: PropTypes.string,
        backgroundPosition:  PropTypes.string,
        type: PropTypes.string,
        hasHeader: PropTypes.bool,
        huge: PropTypes.bool,
        mask: PropTypes.bool,
    }

    static defaultProps = {
        kind: 'h1',
        upper: false,
        backgroundColor:'#494e56',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

     render() {
        const { className, children, style: inlineStyle } = this.props;

        return (

                <Section hasHeader='true' size='huge' type='contrast' mask='true'
                    style={{ background:`url(${this.props.bgImage})`,
                    backgroundPosition:`${this.props.backgroundPosition}`,
                    backgroundSize:`${this.props.backgroundSize}`,
                    backgroundRepeat:`${this.props.backgroundRepeat}`,
                    backgroundColor:`${this.props.backgroundColor}`}}
                    className={classy(style.mainHomePageHero, this.props.className)}
                    >
                    <Container>
                        <Grid>
                            <Grid_Cell sm={12} md={6} lg={6}>
                                <div className={style.section__content}>
                                <Heading kind="h1" color="white">{this.props.title}</Heading>
                                <Paragraph className={style.paragraph}>{this.props.paragraph}</Paragraph>
                                {this.props.buttonText &&
                                    <Button cta="true" large='true' style={{ background:`${this.props.buttonBackground}`,margin:0}} href={this.props.href}>{this.props.buttonText}</Button>
                                }
                                {this.props.children}
                            </div>
                            </Grid_Cell>
                        </Grid>
                    </Container>
                </Section>
        );
   }
}
