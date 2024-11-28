import { Task } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { TaskProperties, TaskStatus } from '../types';

describe('Task Entity', () => {
    let taskProps: TaskProperties;

    beforeEach(() => {
        taskProps = {
            id: uuidv4(),
            title: 'Test Task',
            description: 'Test Description',
            status: TaskStatus.todo,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    it('should create a task with valid properties', () => {
        const task = Task.create(taskProps);
        console.log(task);
        expect(task.props.id).toBe(taskProps.id);
        expect(task.props.title).toBe('Test Task');
        expect(task.props.description).toBe('Test Description');
        expect(task.props.status).toBe(TaskStatus.todo);
    });

    it('should throw an error if title is empty', () => {
        taskProps.title = '';
        expect(() => Task.create(taskProps)).toThrow('Task title cannot be empty.');
    });

    it('should update the status of the task', () => {
        const task = Task.create(taskProps);
        task.updateStatus({ status: TaskStatus.inProgress });
        expect(task.props.status).toBe(TaskStatus.inProgress);
    });

    it('should throw an error if the new status is the same as the current status', () => {
        const task = Task.create(taskProps);
        expect(() => task.updateStatus({ status: TaskStatus.todo })).toThrow('The new status must be different from the current status.');
    });

    it('should update the title of the task', () => {
        const task = Task.create(taskProps);
        task.updateTitle({ title: 'New Title' });
        expect(task.props.title).toBe('New Title');
    });

    it('should throw an error if the new title is empty', () => {
        const task = Task.create(taskProps);
        expect(() => task.updateTitle({ title: '' })).toThrow('Task title cannot be empty.');
    });

    it('should update the description of the task', () => {
        const task = Task.create(taskProps);
        task.updateDescription({ description: 'New Description' });
        expect(task.props.description).toBe('New Description');
    });

    it('should update both title and description of the task', () => {
        const task = Task.create(taskProps);
        task.update({ title: 'New Title', description: 'New Description' });
        expect(task.props.title).toBe('New Title');
        expect(task.props.description).toBe('New Description');
    });
});