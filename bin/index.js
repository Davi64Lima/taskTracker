"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("./domain/task/task.service");
const taskService = new task_service_1.TaskService();
const main = () => {
    console.log('Sejá bem vindo ao task-tracker!');
    const args = process.argv.slice(2);
    const command = args[0];
    taskService.addTask('Test Task', 'Test Description');
    console.log(taskService);
};
main();
