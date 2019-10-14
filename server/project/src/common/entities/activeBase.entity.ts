import { Column } from 'typeorm';
import { Base } from './base.entity';

export abstract class ActiveBase extends Base {
  @Column({ default: true })
  isActive: boolean;
}
