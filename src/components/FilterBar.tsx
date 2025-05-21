import React, {FC} from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import {FilterBarType} from "../types/types";

const FilterBar: FC<FilterBarType> = ({
                                           statusFilter,
                                           onStatusChange,
                                           searchTerm,
                                           onSearchChange,
                                           sort,
                                           onSortChange,
                                       }) => {

    const handleStatusChange = (
        _event: React.MouseEvent<HTMLElement>,
        newStatus: 'all' | 'active' | 'completed' | null
    ) => {
        if (newStatus !== null) {
            onStatusChange(newStatus);
        }
    };

    return (
        <Paper sx={{padding: 2, marginBottom: 3}} elevation={2}>
            <Grid container spacing={2}>
                <Grid size={{xs: 12}}>
                    <TextField
                        label="Rechercher une tâche"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 8}}>
                    <ToggleButtonGroup
                        value={statusFilter}
                        exclusive
                        onChange={handleStatusChange}
                        color="primary"
                    >
                        <ToggleButton sx={{padding: "14.5px"}} value="all">Toutes</ToggleButton>
                        <ToggleButton sx={{padding: "14.5px"}} value="active">En&nbsp;cours</ToggleButton>
                        <ToggleButton sx={{padding: "14.5px"}} value="completed">Terminées</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <FormControl sx={{flex: 1}} fullWidth>
                        <InputLabel id="sort-label">Trier par</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sort}
                            label="Trier par"
                            onChange={(e) => onSortChange(e.target.value as 'date' | 'priority')}
                        >
                            <MenuItem value="date">Date d'échéance</MenuItem>
                            <MenuItem value="priority">Priorité</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FilterBar;
