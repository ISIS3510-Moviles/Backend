import { Controller, Get, NotFoundException, Param, Post, Body, Delete, Patch } from '@nestjs/common';
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

  @Post('check')
  createUserCheck(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserCheck(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('tag/:identification')
  async getUserTagById(@Param('identification') identification: string) {
    const userTag = await this.userService.getUserTagById(identification);
    if (!userTag) {
      throw new NotFoundException(`User with ID ${identification} not found`);
    }
    return userTag;
  }


  @Get('tag')
  async getUsersTag() {
    return await this.userService.getUsersTag();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }  

  @Get('full/:id')
  getUserByIdFull(@Param('id') id: string) {
    return this.userService.getUserByIdFull(id);
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

  @Post('recommend')
  async recommend(@Body('user_id') userId: string) {
    return this.userService.getRecommendations(userId);
  }
}
