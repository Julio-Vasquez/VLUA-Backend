import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

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
}
