import {createContext, FC, useContext, useState} from 'react';
import {Alert, AlertColor, Snackbar} from '@mui/material';
import {ToastContextType} from "../types/types";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: any }> = ({children}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');
    const [duration, setDuration] = useState(4000);

    const showToast = (msg: string, sev?: AlertColor, dur?: number) => {
        setMessage(msg);
        setSeverity(sev ?? 'info');
        setDuration(dur ?? 4000);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};