import { TaskProperties, TaskStatus, TaskUpdateStatusProps } from "../types";

export class Task {
    private readonly _props: TaskProperties;

    private constructor(props: TaskProperties) {
        this._props = {
            ...props,
            id: props.id ?? null,
            title: props.title.trim(),
            description: props.description ?? null,
            status: props.status ?? TaskStatus.todo,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    public static create(props: TaskProperties): Task {
        if (!props.title || props.title.trim().length === 0) {
            throw new Error("Task title cannot be empty.");
        }
        return new Task(props);
    }

    public updateStatus({ status }: TaskUpdateStatusProps): void {
        if (!Object.values(TaskStatus).includes(status)) {
            throw new Error(`Invalid status: ${status}`);
        }

        if (this._props.status === status) {
            throw new Error("The new status must be different from the current status.");
        }

        this._props.status = status;
        this._props.updatedAt = new Date();
    }

    public updateTitle({ title }: { title: string }): void {
        if (!title || title.trim().length === 0) {
            throw new Error("Task title cannot be empty.");
        }

        if (this._props.title === title) {
            throw new Error("The new title must be different from the current title.");
        }

        this._props.title = title;
        this._props.updatedAt = new Date();
    }

    public updateDescription({ description }: { description: string }): void {
        this._props.description = description;
        this._props.updatedAt = new Date();
    }

    public update({ title, description }: { title: string; description: string }): void {
        this.updateTitle({ title });
        this.updateDescription({ description });
    }

    public get props(): TaskProperties {
        return { ...this._props };
    }
}
