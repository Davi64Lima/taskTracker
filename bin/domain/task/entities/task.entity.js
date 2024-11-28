"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const types_1 = require("../types");
class Task {
    constructor(props) {
        var _a, _b, _c, _d, _e;
        this._props = Object.assign(Object.assign({}, props), { id: (_a = props.id) !== null && _a !== void 0 ? _a : null, title: props.title.trim(), description: (_b = props.description) !== null && _b !== void 0 ? _b : null, status: (_c = props.status) !== null && _c !== void 0 ? _c : types_1.TaskStatus.todo, createdAt: (_d = props.createdAt) !== null && _d !== void 0 ? _d : new Date(), updatedAt: (_e = props.updatedAt) !== null && _e !== void 0 ? _e : new Date() });
    }
    static create(props) {
        if (!props.title || props.title.trim().length === 0) {
            throw new Error("Task title cannot be empty.");
        }
        return new Task(props);
    }
    updateStatus({ status }) {
        if (!Object.values(types_1.TaskStatus).includes(status)) {
            throw new Error(`Invalid status: ${status}`);
        }
        if (this._props.status === status) {
            throw new Error("The new status must be different from the current status.");
        }
        this._props.status = status;
        this._props.updatedAt = new Date();
    }
    updateTitle({ title }) {
        if (!title || title.trim().length === 0) {
            throw new Error("Task title cannot be empty.");
        }
        if (this._props.title === title) {
            throw new Error("The new title must be different from the current title.");
        }
        this._props.title = title;
        this._props.updatedAt = new Date();
    }
    updateDescription({ description }) {
        this._props.description = description;
        this._props.updatedAt = new Date();
    }
    update({ title, description }) {
        this.updateTitle({ title });
        this.updateDescription({ description });
    }
    get props() {
        return Object.assign({}, this._props);
    }
}
exports.Task = Task;
