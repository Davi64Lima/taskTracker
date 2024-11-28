import { Task } from "./task.entity";
import { TaskRepository } from "./tasks.repository";
import { v4 as uuidv4 } from 'uuid';

const taskRepository = new TaskRepository();

export class TaskService {
    private readonly taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = taskRepository;
    }

    public getTasks(): Task[] {
        return this.taskRepository.getTasks();
    }

    public addTask(title: string, description: string): void {
        const props = { id: uuidv4(), title, description };
        const task = this.taskRepository.create(props);
        this.taskRepository.save(task);
    }
}