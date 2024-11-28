"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_entity_1 = require("./entities/task.entity");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const taskFilePath = path_1.default.join(__dirname, 'tasks.json');
class TaskRepository {
    constructor() {
        this.tasks = [];
        this.filePath = taskFilePath;
        this.tasks = initTaskFile(this.filePath);
    }
    create(props) {
        return task_entity_1.Task.create(props);
    }
    findById(id) {
        return this.tasks.find(task => task.props.id === id);
    }
    save(task) {
        this.tasks.push(task);
        this.saveToFile();
    }
    update(task) {
        const index = this.tasks.findIndex(t => t.props.id === task.props.id);
        if (index >= 0) {
            this.tasks[index] = task;
            this.saveToFile();
        }
    }
    deleteById(id) {
        this.tasks = this.tasks.filter(task => task.props.id !== id);
        this.saveToFile();
    }
    saveToFile() {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.tasks), 'utf-8');
    }
}
exports.TaskRepository = TaskRepository;
const initTaskFile = (taskFilePath) => {
    if (!fs_1.default.existsSync(taskFilePath)) {
        fs_1.default.writeFileSync(taskFilePath, JSON.stringify([]), 'utf-8');
        return [];
    }
    try {
        const fileContent = fs_1.default.readFileSync(taskFilePath, 'utf-8');
        if (fileContent) {
            return JSON.parse(fileContent);
        }
    }
    catch (error) {
        console.error("Failed to read or parse the task file:", error);
    }
    return [];
};
