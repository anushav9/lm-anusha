import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
// import { Anchor} from 'components';
import appStore from '../../assets/images/appstore_2x.png';
import googlePlay from '../../assets/images/googleplay_2x.png';

export default class AppStoreButtons extends Component {


     render() {

          return (
               <div style={this.props.style} className={classy(this.props.className,style.appStoreButtons)}>
                   <ul className={this.props.type=='horiz' ? style.horiz : undefined}>

                       <li className={style.navList__item}>
                           <a className={style.navList__link} href="#">
                               <img src={appStore} className={style.appStoreButton} alt="Download on the AppStore"/>
                           </a>
                       </li>
                       <li className={style.navList__item}>
                           <a className={style.navList__link} href="#">
                               <img src={googlePlay} className={style.appStoreButton} alt="Get it on Google Play"/>
                           </a>
                       </li>
                   </ul>
               </div>
          );
     }
}
