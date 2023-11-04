import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Response, Request } from 'express';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);

    return res.redirect('/');
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const getdata = await this.userService.findAll();

    return res.render('index', {
      data: getdata,
      extra: { agent: req.get('user-agent'), url: req.url },
    });
  }

  @Get('/add')
  add(@Req() req: Request, @Res() res: Response) {
    return res.render('add', {
      extra: { agent: req.get('user-agent'), url: req.url },
    });
  }
  @Get('/update/:id')
  async update(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    const alldata = await this.userService.findAll();
    const getsingledata = alldata.find((item) => item.id == id);

    return res.render('update', {
      data: getsingledata,
      extra: { agent: req.get('user-agent'), url: req.url },
    });
  }
  @Post('/update/:id')
  updateByData(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.userService.update(+id, updateUserDto);

    return res.redirect('/');
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
