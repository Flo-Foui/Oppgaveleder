import {ReactNode, useMemo} from 'react';
import {createTheme, CssBaseline, ThemeProvider as MUIThemeProvider} from '@mui/material';


export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'light',
                    secondary: {
                        main: '#ffc21d',
                    },
                    warning: {
                        main: '#ff8500',
                    },
                    error: {
                        main: '#d30000',
                    },
                    success: {
                        main: '#4caf50',
                    },
                    background: {default: '#f4f6f8'},
                },
                shape: {borderRadius: 12},
            }),
        []
    );

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </MUIThemeProvider>
    );
};