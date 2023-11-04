import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Response } from 'express';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);

    return res.redirect('/');
  }

  @Get()
  async findAll(@Res() res: Response) {
    const getdata = await this.userService.findAll();

    return res.render('index', { data: getdata });
  }

  @Get('/add')
  add(@Res() res: Response) {
    return res.render('add');
  }
  @Get('/update/:id')
  async update(@Res() res: Response, @Param('id') id: number) {
    const alldata = await this.userService.findAll();
    const getsingledata = alldata.find((item) => item.id == id);

    return res.render('update', { data: getsingledata });
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
    console.log('targeted' + updateUserDto);

    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
