import { UpdateCourseDto } from './dto/updateCourse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, Post, Body, UseGuards, Delete, Put, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { User } from 'src/user/decorator/user.decorator';
import { CreateCourseDto } from './dto/createCourse.dto';

@Controller('course')
export class CourseController {
    constructor(
        private coursesService: CourseService
    ) 
    {}

    // get all courses
    @Get()
    async getAllCourses(){
        return await this.coursesService.getAllCourses()
    }



    @Get('/search')
    async searchCourses(@Query('name') name: string) {
      return await this.coursesService.searchCoursesByName(name);
    }

    // find course details
    @Get('/:id')
    async getDetailCourse(@Param('id') id: number){
        return await this.coursesService.getDetailCourse(id)
    }


    // delete a course 
    @UseGuards(AuthGuard('instructor'))
    @Delete('/:idCourse/delete')
    async delete(@Param('idCourse') idCourse: number) {
      return this.coursesService.deleteCourse(idCourse);
    } 

    @UseGuards(AuthGuard('instructor'))
    @Put('/:idCourse/update')
    async updateCourse(@Param('idCourse') idCourse: number, @Body() data: UpdateCourseDto){
        return this.coursesService.updateCourse(idCourse, data);

    }

    // create a new course
    @UseGuards(AuthGuard('instructor'))
    @Post()
    async createCourse(@Body() course : CreateCourseDto, @User() user: any)
    {
        course.creator = user.userId
        return await this.coursesService.createCourse(course)
    }

    
    // get courses base on catetory
    @Get('categories/:id')
    async getCoursesBaseCate(@Param('id') id: number){
        return await this.coursesService.getCoursesBaseCate(id)
    }
    
    // Enrollments
    @UseGuards(AuthGuard('student'))
    @Get(':idCourse/enrollment')
    async enrollCourse(@Param('idCourse') idCourse: number, @User() user: any){
        const idUser = user.userId
        return await this.coursesService.enrollCourse(idCourse, idUser)
    }
    
    // get my courses
    @UseGuards(AuthGuard('instructor'))
    @Get('v1/me')
    async getMyCourse(@User() user: any)
    {
        return await this.coursesService.getMyCourse(user.userId)
    }

    // lấy ra các khóa học đã đăng ký
    @UseGuards(AuthGuard('student'))
    @Get('v1/registered')
    async getMyCoursesRegistered(@User() user: any){
        return await this.coursesService.getMyCoursesRegistered( user.userId)
    }


    
}
