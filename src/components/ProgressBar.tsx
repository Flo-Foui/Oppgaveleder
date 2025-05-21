import {FC} from 'react';
import {Box, LinearProgress, Typography} from '@mui/material';
import {ProgressBarType} from "../types/types";

const ProgressBar: FC<ProgressBarType> = ({total, completed}) => {
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Box sx={{marginBottom: 3}}>
            <Typography variant="body1" sx={{marginBottom: 0.5}}>
                {percent}% des tâches sont terminées !
            </Typography>
            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#c8e6c9',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4caf50',
                    },
                }}
            />
        </Box>
    );
};

export default ProgressBar;
