import { Controller, Get, Body, Post, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';

import  Response   from './../common/response/response';

@Controller('author')
export class AuthorController
{
  constructor(
    private readonly serviceEditorial : AuthorService
  ){}
}