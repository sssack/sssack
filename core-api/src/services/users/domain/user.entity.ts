import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { generateId } from '../../../libs/utils';

interface Ctor {
  username: string;
  password: string;
}

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  constructor(args?: Ctor) {
    super();

    if (args) {
      this.id = generateId();
      this.username = args.username;
      this.password = args.password;
    }
  }
}
