import {useState, useEffect} from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (err) {
            console.error(`Erreur de lecture localStorage[${key}]`, err);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error(`Erreur de sauvegarde localStorage[${key}]`, err);
        }
    }, [key, value]);

    return [value, setValue] as const;
}