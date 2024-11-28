export type TaskProperties = {
    id: string;
    title: string;
    description: string;
    status?: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TaskUpdateStatusProps = {
    status: TaskStatus;
}

export enum TaskStatus {
    todo = 'todo',
    inProgress = 'in-progress',
    done = 'done',
}