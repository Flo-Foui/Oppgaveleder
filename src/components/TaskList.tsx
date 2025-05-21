import {FC} from 'react';
import {Stack, Typography} from '@mui/material';
import TaskItem from './TaskItem';
import {TaskListType} from "../types/types";

const TaskList: FC<TaskListType> = ({tasks, onComplete, onDelete}) => {
    if (tasks.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" sx={{marginTop: 2}}>
                Aucune tâche à afficher.
            </Typography>
        );
    }

    return (
        <Stack spacing={2} sx={{marginTop: 2}}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                />
            ))}
        </Stack>
    );
};

export default TaskList;
