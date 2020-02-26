import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './../../entities/user.entity';

import { UserNameDto } from './dto/username.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async myProfile(userName: UserNameDto) {
    return await this.repository
      .createQueryBuilder('user')
      .select('user.userName', 'UserName')
      .addSelect('people.nameOne', 'NameOne')
      .addSelect('people.nameTwo', 'NameTwo')
      .addSelect('people.lastNameOne', 'LastNameOne')
      .addSelect('people.lastNameTwo', 'LastNameTwo')
      .addSelect("CONCAT(people.birthDate, '')", 'BirthDate')
      .addSelect('people.identification', 'Identification')
      .addSelect('gender.gender', 'Genders')
      .addSelect('typeDoc.typeDoc', 'Document')
      .innerJoin('user.people', 'people')
      .innerJoin('people.typeDoc', 'typeDoc')
      .innerJoin('people.gender', 'gender')
      .where('user.userName = :userName', { userName: userName.userName })
      .andWhere("people.state = 'Activo'")
      .getRawOne();
  }

  public async validateUserToken(username: string): Promise<boolean> {
    //chekear que exista
    const res = await this.repository.findOne({
      where: { userName: username },
    });
    return res ? true : false;
  }

  public async validUser(username: string, password: string) {
    const user = await this.repository.findOne({
      where: { userName: username },
    });
    return user ? true : false;
  }
}
