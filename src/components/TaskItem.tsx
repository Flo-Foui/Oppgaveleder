import {FC, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import {Priority, TaskItemType} from "../types/types";
import {formatDate} from "../utils/TaskUtils";

const priorityColor: Record<Priority, 'secondary' | 'warning' | 'error'> = {
    basse: 'secondary',
    moyenne: 'warning',
    élevée: 'error',
};

const TaskItem: FC<TaskItemType> = ({task, onComplete, onDelete}) => {
    const theme = useTheme()
    const {id, title, description, endDate, priority, completed} = task;
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    mb: 2,
                    backgroundColor: completed ? '#e0f7fa' : '#fff',
                    opacity: completed ? 0.7 : 1,
                    borderLeft: `7px solid ${theme.palette[priorityColor[priority]].main}`
                }}
            >
                <CardContent sx={{flex: 1, '& > *:not(:last-child)': {marginBottom: 1},}}>
                    <Typography variant="h5" fontWeight="bold"
                                sx={{textDecoration: completed ? 'line-through' : 'none'}}>
                        {title}
                    </Typography>
                    <Stack direction="row" alignItems="center" flexWrap={"wrap"}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{marginRight: {xs: 0, sm: 2}}}>
                            Échéance : {formatDate(endDate)}
                        </Typography>
                        <Chip label={`Priorité : ${priority}`} color={priorityColor[priority]} size="small"/>
                    </Stack>
                    {description && (
                        <Typography variant="body2" color="text.secondary" textAlign="justify">
                            {description}
                        </Typography>
                    )}
                </CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{paddingRight: 2}}>
                    <IconButton color="success" title="Marquer comme terminée" onClick={() => onComplete(id)}>
                        {completed ?
                            <CheckBoxIcon fontSize="large"/> :
                            <CheckBoxOutlineBlankIcon fontSize="large"/>}
                    </IconButton>
                    <IconButton title="Supprimer la tâche" onClick={() => setConfirmOpen(true)}>
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </Stack>
            </Card>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Supprimer la tâche ?</DialogTitle>
                <DialogActions sx={{justifyContent: "space-between"}}>
                    <Button onClick={() => setConfirmOpen(false)}>Annuler</Button>
                    <Button onClick={() => {
                        onDelete(id);
                        setConfirmOpen(false);
                    }} color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskItem;
