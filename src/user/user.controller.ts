import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':identification')
  getUserById(@Param('identification') identification: string) {
    return this.userService.getUserById(identification);
  }

  @Delete(':identification')
  deleteUserById(@Param('identification') identification: string) {
    return this.userService.deleteUser(identification);
  }

  @Patch(':identification')
  updateUserById(
    @Param('identification') identification: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(identification, updateUserDto);
  }
}

