import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';

interface Ctor {
  username: string;
  password: string;
}

@Entity()
export class User extends DddAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  constructor(args?: Ctor) {
    super();

    if (args) {
      this.username = args.username;
      this.password = args.password;
    }
  }
}
