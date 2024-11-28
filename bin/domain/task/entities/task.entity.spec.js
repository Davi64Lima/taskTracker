"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_entity_1 = require("./task.entity");
const uuid_1 = require("uuid");
const types_1 = require("../types");
describe('Task Entity', () => {
    let taskProps;
    beforeEach(() => {
        taskProps = {
            id: (0, uuid_1.v4)(),
            title: 'Test Task',
            description: 'Test Description',
            status: types_1.TaskStatus.todo,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });
    it('should create a task with valid properties', () => {
        const task = task_entity_1.Task.create(taskProps);
        console.log(task);
        expect(task.props.id).toBe(taskProps.id);
        expect(task.props.title).toBe('Test Task');
        expect(task.props.description).toBe('Test Description');
        expect(task.props.status).toBe(types_1.TaskStatus.todo);
    });
    it('should throw an error if title is empty', () => {
        taskProps.title = '';
        expect(() => task_entity_1.Task.create(taskProps)).toThrow('Task title cannot be empty.');
    });
    it('should update the status of the task', () => {
        const task = task_entity_1.Task.create(taskProps);
        task.updateStatus({ status: types_1.TaskStatus.inProgress });
        expect(task.props.status).toBe(types_1.TaskStatus.inProgress);
    });
    it('should throw an error if the new status is the same as the current status', () => {
        const task = task_entity_1.Task.create(taskProps);
        expect(() => task.updateStatus({ status: types_1.TaskStatus.todo })).toThrow('The new status must be different from the current status.');
    });
    it('should update the title of the task', () => {
        const task = task_entity_1.Task.create(taskProps);
        task.updateTitle({ title: 'New Title' });
        expect(task.props.title).toBe('New Title');
    });
    it('should throw an error if the new title is empty', () => {
        const task = task_entity_1.Task.create(taskProps);
        expect(() => task.updateTitle({ title: '' })).toThrow('Task title cannot be empty.');
    });
    it('should update the description of the task', () => {
        const task = task_entity_1.Task.create(taskProps);
        task.updateDescription({ description: 'New Description' });
        expect(task.props.description).toBe('New Description');
    });
    it('should update both title and description of the task', () => {
        const task = task_entity_1.Task.create(taskProps);
        task.update({ title: 'New Title', description: 'New Description' });
        expect(task.props.title).toBe('New Title');
        expect(task.props.description).toBe('New Description');
    });
});
