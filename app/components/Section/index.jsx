import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';

export default class Section extends Component {
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        color: PropTypes.string,
        hasHeader: PropTypes.bool,
        mask: PropTypes.bool,
        children: PropTypes.any
    }

     render() {

          return (
               <div style={this.props.style} className={classy(this.props.className, style.section, this.props.type == 'contrast' && style.section_contrast,this.props.type == 'light' && style.section__light, this.props.size == 'large' && style.section__large,
               this.props.size == 'huge' && style.section__huge,
               this.props.type == 'banner' && style.section__banner,
               this.props.color == 'primary' && style.section__brandPrimary,
               this.props.hasHeader == 'true' && style.section__hasHeaderOnTop)}>
               {this.props.mask =='true' && <div className={style.mask}></div>}

                   {this.props.children}
               </div>
          );
     }
}
