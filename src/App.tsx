import {useState} from 'react';
import {AppBar, Box, Container, Grid, Paper, Toolbar, Typography,} from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import ProgressBar from './components/ProgressBar';
import {useTasks} from './context/TaskContext';
import {getProgress, sortTasksByDate, sortTasksByPriority} from './utils/TaskUtils';
import UrgentAlert from "./components/UrgentAlert";

const App = () => {
    const {tasks, addTask, deleteTask, toggleComplete} = useTasks();
    const {total, completed} = getProgress(tasks);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [sort, setSort] = useState<'date' | 'priority'>('date');

    const filteredTasks = tasks.filter((task) => {
        const matchStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && !task.completed) ||
            (statusFilter === 'completed' && task.completed);

        const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

    const sortedTasks =
        sort === 'date' ? sortTasksByDate(filteredTasks) : sortTasksByPriority(filteredTasks);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" elevation={0} sx={{backgroundColor: '#0f2537'}}>
                <Toolbar sx={{justifyContent: 'center'}}>
                    <Typography variant="h3" color="inherit" fontWeight={500} marginY={1}>
                        Oppgaveleder
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth={false} sx={{padding: 4}}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 4}}>
                        <Paper elevation={2} sx={{
                            p: 3,
                            position: 'sticky',
                            top: 32,
                            alignSelf: 'flex-start',
                        }}>
                            <TaskForm onAdd={addTask}/>
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 12, md: 8}}>
                        <FilterBar
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            sort={sort}
                            onSortChange={setSort}
                        />
                        <UrgentAlert tasks={tasks}/>
                        <ProgressBar total={total} completed={completed}/>
                        <TaskList
                            tasks={sortedTasks}
                            onComplete={toggleComplete}
                            onDelete={deleteTask}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default App;
