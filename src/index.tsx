import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {TaskProvider} from "./context/TaskContext";
import {ToastProvider} from "./context/ToastContext";
import {ThemeProvider} from "./context/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <ToastProvider>
                <TaskProvider>
                    <App/>
                </TaskProvider>
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>
);
