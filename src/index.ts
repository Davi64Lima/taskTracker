import { TaskService } from './Domain/Entities/Tasks/task.service';

const taskService = new TaskService();

const main = () => {
    console.log('Sejá bem vindo ao task-tracker!');



    const args = process.argv.slice(2);
    const command = args[0];

    const task = taskService.getTasks();

    console.log(task);

    taskService.addTask('Test Task', 'Test Description');

    console.log(taskService.getTasks());

}

main();