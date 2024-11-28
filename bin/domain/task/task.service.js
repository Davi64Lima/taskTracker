"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const tasks_repository_1 = require("./tasks.repository");
const uuid_1 = require("uuid");
const taskRepository = new tasks_repository_1.TaskRepository();
class TaskService {
    constructor() {
        this.taskRepository = taskRepository;
    }
    addTask(title, description) {
        const props = { id: (0, uuid_1.v4)(), title, description };
        const task = this.taskRepository.create(props);
        this.taskRepository.save(task);
    }
}
exports.TaskService = TaskService;
