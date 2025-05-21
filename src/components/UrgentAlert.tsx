import {FC, useState} from 'react';
import {IconButton, Paper, Typography} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import {UrgentAlertType} from "../types/types";
import {isEndingSoon} from '../utils/TaskUtils';

const UrgentAlert: FC<UrgentAlertType> = ({tasks}) => {
    const [visible, setVisible] = useState(true);
    const urgentTasks = tasks.filter(isEndingSoon);

    if (!visible || urgentTasks.length === 0) return null;

    return (
        <Paper
            elevation={1}
            sx={{
                padding: 2,
                marginBottom: 2,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff8e1',
                borderLeft: '7px solid',
                borderColor: '#ff9800'
            }}
        >
            <WarningIcon sx={{color: '#ff9800', marginRight: 2}}/>

            <Typography sx={{flexGrow: 1}} variant="body1">
                {urgentTasks.length === 1
                    ? `La tâche "${urgentTasks[0].title}" approche de son échéance !`
                    : ` ${urgentTasks.length} tâches sont proches de leur échéances !`}
            </Typography>

            <IconButton onClick={() => setVisible(false)}>
                <CloseIcon/>
            </IconButton>
        </Paper>
    );
};

export default UrgentAlert;
