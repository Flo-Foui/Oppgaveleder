import {FC, FormEvent, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {v4 as uuidv4} from 'uuid';
import {TaskFormType, TaskType} from "../types/types";
import {registerLocale} from 'react-datepicker';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {fr} from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('fr', fr);

const TaskForm: FC<TaskFormType> = ({onAdd}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState<'basse' | 'moyenne' | 'élevée'>('basse');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingTask, setPendingTask] = useState<TaskType | null>(null);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setEndDate(null);
        setPriority('basse');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !endDate) return;

        const newTask: TaskType = {
            id: uuidv4(),
            title,
            description,
            endDate: endDate?.toISOString() || '',
            priority,
            completed: false,
        };

        const now = new Date();
        if (endDate < now) {
            setPendingTask(newTask);
            setConfirmOpen(true);
            return;
        }

        onAdd(newTask);
        resetForm()
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={500}>
                        Nouvelle tâche
                    </Typography>
                    <TextField
                        label="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={3}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                        <DateTimePicker
                            label="Échéance"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            ampm={false} // format 24h
                            slotProps={{textField: {fullWidth: true, required: true}}}
                            format="dd/MM/yyyy HH:mm"
                        />
                    </LocalizationProvider>
                    <Box>
                        <FormLabel>Priorité :</FormLabel>
                        <RadioGroup
                            row
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'basse' | 'moyenne' | 'élevée')}
                        >
                            <FormControlLabel value="basse" control={<Radio/>} label="Basse"/>
                            <FormControlLabel value="moyenne" control={<Radio/>} label="Moyenne"/>
                            <FormControlLabel value="élevée" control={<Radio/>} label="Élevée"/>
                        </RadioGroup>
                    </Box>
                    <Button type="submit" variant="contained">
                        Ajouter la tâche
                    </Button>
                </Stack>
            </form>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Échéance dépassée</DialogTitle>
                <DialogContent>
                    L'échéance de la tâche est déjà passée. <br/>
                    Voulez-vous quand même l'ajouter ?
                </DialogContent>
                <DialogActions sx={{justifyContent: "space-between"}}>
                    <Button onClick={() => setConfirmOpen(false)}>Annuler</Button>
                    <Button
                        onClick={() => {
                            if (pendingTask) onAdd(pendingTask);
                            resetForm();
                            setConfirmOpen(false);
                        }}
                        variant="contained"
                    >
                        Ajouter quand même
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskForm;
