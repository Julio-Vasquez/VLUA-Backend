import { Controller, Get, Body, Post, HttpStatus } from '@nestjs/common';
import { EditorialService } from './editorial.service';

import  Response   from './../common/response/response';

@Controller('editorial')
export class EditorialController
{
  constructor(
    private readonly serviceEditorial : EditorialService
  ){}
}