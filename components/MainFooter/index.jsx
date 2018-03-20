import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Container,Heading,Anchor,Grid,Grid_Cell} from 'components';

export default class MainFooter extends Component {
     render() {

          return (
              <footer className={style.mainFooter}>
                  <Container className={style.container}>
                      <div className={style.mainFooter__copyright}>
                         <span>Copyright &copy; 2017 LaundryMate</span>
                    </div>
                    <div>
                         <ul className={classy(style.navList,style.navListHoriz,this.props.className)}>
                              <li className={style.navList__item}>
                                   <a className={style.navList__link} href="#">Terms of Use</a>
                              </li>
                              <li className={style.navList__item}>
                                   <a className={style.navList__link} href="#">Privacy Policy</a>
                              </li>
                         </ul>
                    </div>
                  </Container>
              </footer>
          );
     }
}
