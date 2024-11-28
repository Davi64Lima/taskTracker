import { Task } from "./task.entity";
import fs from 'fs';
import { TaskProperties } from "./types";
import path from "path";

const taskFilePath = path.join(__dirname, 'tasks.json');


export class TaskRepository {
    private tasks: Task[] = [];
    private filePath: string = taskFilePath;

    constructor() {
        this.tasks = initTaskFile(this.filePath);
    }

    public getTasks(): Task[] {
        const fileContent = fs.readFileSync(taskFilePath, 'utf-8');
        if (fileContent) {
            const tasks: Task[] = JSON.parse(fileContent);
            return tasks;
        }
        return [];
    }

    public create(props: TaskProperties): Task {
        return Task.create(props);
    }

    public findById(id: string): Task | undefined {
        return this.tasks.find(task => task.props.id === id);
    }

    public save(task: Task): void {
        this.tasks.push(task);
        this.saveToFile();
    }

    public update(task: Task): void {
        const index = this.tasks.findIndex(t => t.props.id === task.props.id);
        if (index >= 0) {
            this.tasks[index] = task;
            this.saveToFile();
        }
    }

    public deleteById(id: string): void {
        this.tasks = this.tasks.filter(task => task.props.id !== id);
        this.saveToFile();
    }

    private saveToFile(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks), 'utf-8');
    }
}

const initTaskFile = (taskFilePath: string): Task[] => {
    if (!fs.existsSync(taskFilePath)) {
        fs.writeFileSync(taskFilePath, JSON.stringify([]), 'utf-8');
        return [];
    }

    try {
        const fileContent = fs.readFileSync(taskFilePath, 'utf-8');
        if (fileContent) {
            return JSON.parse(fileContent);
        }
    } catch (error) {
        console.error("Failed to read or parse the task file:", error);
    }

    return [];
};