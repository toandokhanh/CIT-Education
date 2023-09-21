

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";
import { Course } from "./course.entity";
import { Enrollment } from "./enrollment.entity";




@Entity('lessons')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Video, video => video.lesson, { eager: true })
    video: Video;

    @ManyToOne(() => Course, course => course.lessons)
    course : Course;

    @OneToMany(() => Enrollment, enrollment => enrollment.course)
    enrollments: Enrollment[];
}