import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';

export default class Section extends Component {

     render() {

          return (
               <div style={this.props.style} className={classy(this.props.className, style.section, this.props.type == 'contrast' && style.section_contrast, this.props.type == 'light' && style.section_light, this.props.size == 'large' && style.section_large,
                   this.props.size == 'huge' && style.section_huge,
                   this.props.type == 'banner' && style.section_banner,
                   this.props.color == 'primary' && style.section_brandPrimary,
                   this.props.hasHeader == 'true' && style.section__hasHeaderOnTop)}>
                   {this.props.children}
               </div>
          );
     }
}
