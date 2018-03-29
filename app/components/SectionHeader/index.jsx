import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';
import { Heading} from 'components';

export default class SectionHeader extends Component {
    static propTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
        align: PropTypes.string,
        hasBorder: PropTypes.bool,
        children: PropTypes.any
    }

     render() {

          return (
               <div style={this.props.style} className={classy(this.props.className, style.section,this.props.align =='center' && style.align__center, this.props.hasBorder == 'true' && style.headerWithBorder)}>
                    {this.props.title &&
                       <Heading kind="h3">{this.props.title}</Heading>
                     }
                   {this.props.subtitle &&
                        <Heading kind="h2">{this.props.subtitle}</Heading>
                   }
                   {this.props.children}
               </div>
          )
     }
}
