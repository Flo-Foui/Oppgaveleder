import {TaskType} from "../types/types";

export const sortTasksByDate = (tasks: TaskType[]): TaskType[] => {
    return [...tasks].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
};

export const sortTasksByPriority = (tasks: TaskType[]): TaskType[] => {
    const priorityOrder = {élevée: 0, moyenne: 1, basse: 2};
    return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const isEndingSoon = (task: TaskType): boolean => {
    const now = new Date();
    const end = new Date(task.endDate);
    const diff = end.getTime() - now.getTime();
    return !task.completed && diff <= 2 * 86400000 && diff >= 0; // moins de 2 jours (2 * 86 400 000 ms par jour)
};

export const getProgress = (tasks: TaskType[]) => {
    const completed = tasks.filter((t) => t.completed).length;
    return {
        total: tasks.length,
        completed
    };
};

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const datePart = date.toLocaleDateString('fr-FR');       // DD/MM/AAAA
    const timePart = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });                                                             // hh:mm
    return `${datePart} à ${timePart}`;
};