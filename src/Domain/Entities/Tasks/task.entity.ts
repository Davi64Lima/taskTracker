import { TaskProperties, TaskStatus } from "./types";

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

    public get props(): TaskProperties {
        return { ...this._props };
    }
}
