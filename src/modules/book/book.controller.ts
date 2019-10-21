import { Controller, Get, Body, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { ChangePasswordDto } from '../user/dto/changepassword.dto';

@Controller('book')
export class BookController {
  constructor(private readonly book: BookService){}

  @Get('/allbook')
  public async allBook() : Promise<any>
  {
    const res = await this.book.findAll();
    if(res.length > 0 ){
      return "hay archivos";
    }
    return "no hay archivos";
  }
  @Post('/test')
  public async test(@Body() pass: ChangePasswordDto) : Promise <string>
  {
    console.log(pass)
    return "hola";
  }
}
