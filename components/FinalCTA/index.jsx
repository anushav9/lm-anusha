import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Container, Section, Anchor} from 'components';

export default class FinalCTA extends Component {

    render() {

        return (
            <Section type="light" className={style.finalCTA}>
                <Container>
                    <div style={this.props.style} className={classy(this.props.className, style.finalCTA__content)}>
                        <span>{this.props.text}</span>
                        <Anchor className={classy(style.button, style.button__cta, style.button__large)} href="#">{this.props.buttontext}</Anchor>
                    </div>
                </Container>
            </Section>
        );
    }
}
