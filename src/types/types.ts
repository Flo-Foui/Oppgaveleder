import {AlertColor} from "@mui/material";

export type Priority = 'basse' | 'moyenne' | 'élevée';

export interface TaskType {
    id: string;
    title: string;
    description: string;
    endDate: string;
    priority: Priority;
    completed: boolean;
}

export interface TaskItemType {
    task: TaskType;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface TaskListType {
    tasks: TaskType[];
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export interface TaskFormType {
    onAdd: (newTask: TaskType) => void;
}

export interface TaskContextType {
    tasks: TaskType[];
    addTask: (task: TaskType) => void;
    deleteTask: (id: string) => void;
    toggleComplete: (id: string) => void;
}

export interface FilterBarType {
    statusFilter: 'all' | 'active' | 'completed';
    onStatusChange: (status: 'all' | 'active' | 'completed') => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    sort: 'date' | 'priority';
    onSortChange: (sort: 'date' | 'priority') => void;
}

export interface ProgressBarType {
    total: number;
    completed: number;
}

export interface ToastContextType {
    showToast: (
        message: string,
        severity?: AlertColor,
        duration?: number
    ) => void;
}

export interface UrgentAlertType {
    tasks: TaskType[];
}