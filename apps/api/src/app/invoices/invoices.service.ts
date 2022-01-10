
// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { User } from '../../auth/user.entity';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { GetTaskFilteredDto } from '../dto/get-task-filtered.dto';
// import { TaskStatus } from '../model/task-status.enum';
// import { Task } from '../task.entity';
// import { TaskImplRepository } from '../repo/task-impl.repository';

// @Injectable()
// export class TasksService {

//   constructor(
//     @Inject(TaskImplRepository)
//     private taskRepo: TaskImplRepository,
//   ) {
//   }

//   /**
//    * - Create Task
//    * @param user
//    * @param createTaskDto
//    */
//   async createTask(
//     user: User,
//     createTaskDto: CreateTaskDto,
//   ): Promise<Task> {
//     return await this.taskRepo.createTask(user, createTaskDto);
//   }

//   async deleteTaskById(user: User, id: number): Promise<void> {
//     await this.taskRepo.deleteTaskById(user, id);
//     return;
//   }

//   /**
//    * - Get All Task
//    * @param user
//    * @param filteredDto
//    */
//   async getAllTasks(
//     user: User,
//     filteredDto: GetTaskFilteredDto,
//   ): Promise<Task[]> {
//     return await this.taskRepo.getAllTasks(user, filteredDto);
//   }

//   /**
//    * - Get Task By Id
//    * @param user
//    * @param id
//    */
//   async getTaskById(user: User, id: number): Promise<Task> {
//     const found = await this.taskRepo.findOne({ where: { id, userId: user.id } });

//     if (!found) {
//       throw new NotFoundException(`Task ${id} not found;`);
//     }

//     return found;
//   }

//   /**
//    * - Update Task Status
//    * @param user
//    * @param id
//    * @param status
//    */
//   async updateTaskStatus(
//     user: User,
//     id: number,
//     status: TaskStatus,
//   ): Promise<Task> {
//     const found = await this.getTaskById(user, id);
//     // update task status
//     found.status = status;

//     await found.save();

//     return found;
//   }

// }
