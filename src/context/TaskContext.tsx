import {createContext, useContext, FC} from 'react';
import {TaskType} from "../types/types";
import {useLocalStorage} from '../hooks/useLocalStorage';
import {TaskContextType} from "../types/types";
import {useToast} from "./ToastContext";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: FC<{ children: any }> = ({children}) => {
    const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', []);
    const {showToast} = useToast()

    const addTask = (task: TaskType) => {
        setTasks((prev) => [...prev, task]);
        showToast('Tâche ajoutée avec succès', 'success');
    };

    const deleteTask = (id: string) => {
        const task = tasks.find((task) => task.id === id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
        showToast(`Tâche "${task?.title}" supprimée`, 'info');
    };

    const toggleComplete = (id: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? {...task, completed: !task.completed} : task))
        );
    };

    return (
        <TaskContext.Provider value={{tasks, addTask, deleteTask, toggleComplete}}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};