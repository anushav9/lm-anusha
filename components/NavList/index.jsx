import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Anchor} from 'components';

export default class NavList extends Component {
     render() {
         const { className, children, style: inlineStyle } = this.props;
          return (
               <div style={this.props.style} className={classy(this.props.className)}>
                   <ul>
                       <li>
                           {this.props.children}
                       </li>
                   </ul>
               </div>
          );
     }
}
