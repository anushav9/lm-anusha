import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Button} from 'components';

export default class FinalCTA extends Component {
    static propTypes = {
        children: PropTypes.any,
        text: PropTypes.string,
        background: PropTypes.string,
        href: PropTypes.string
    }

    render() {

        return (
            <Section type="light" className={style.finalCTA}>
                <Container>
                    <div style={this.props.style} className={classy(this.props.className, style.finalCTA__content)}>
                        <span>{this.props.text}</span>
                        <Button large='true' cta='true' style={{ background:`${this.props.background}`}} href={this.props.href}>{this.props.buttontext}</Button>
                    </div>
                </Container>
            </Section>
        );
    }
}
