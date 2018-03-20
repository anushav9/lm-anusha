import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';
import { Heading,Anchor,Grid,Grid_Cell} from 'components';

export default class Card extends Component {
     render() {

          return (
                  <Grid_Cell md={4} style={{margin:'10px 0px', padding:'0px 15px'}}>
                   <div style={this.props.style} className={classy(this.props.className, style.card, this.props.type == 'washing' && style.card__washing, this.props.type == 'drycleaning' && style.card__drycleaning, this.props.type == 'tailoring' && style.card__tailoring)}>
                       <div className={classy(this.props.className, style.card__header)}>
                           <div className={style.card__media}>
                               <div className={classy(this.props.className, style.icon,
                               this.props.service=='washing' && style.icon__washing,
                               this.props.service=='drycleaning' && style.icon__drycleaning,
                               this.props.service=='tailoring' && style.icon__tailoring)}>
                               </div>
                           </div>

                        </div>
                        <div className={style.cardContent}>
                            <Heading className={style.card__title} kind="h3" color="black">{this.props.h3}</Heading>
                            <Anchor className={style.card__anchor} href={this.props.href}>{this.props.link}</Anchor>
                        </div>

                   </div>
                </Grid_Cell>
          );
     }
}
