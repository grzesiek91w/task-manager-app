import { createSlice, configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
    createdAt: string;
}

const initialState: Task[] = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            // Sprawdź, czy zadanie o tym samym tytule już istnieje
            const existingTask = state.find(task => task.title === action.payload.title);
            if (!existingTask) {
                
                const newTask: Task = {
                    ...action.payload,
                    id: uuidv4(),
                    createdAt: new Date().toISOString(),
                };
                state.push(newTask);
            } else {
                console.warn('Zadanie o tym tytule już istnieje:', action.payload.title);
            }
        },
        editTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        toggleTaskStatus: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload);
            if (index !== -1) {
                // Przełączanie statusu
                const currentStatus = state[index].status;
                const nextStatus = currentStatus === 'Do zrobienia' ? 'W trakcie' :
                                   currentStatus === 'W trakcie' ? 'Zrobione' :
                                   'Do zrobienia';
                state[index].status = nextStatus;
            }
        },
    },
});

export const { addTask, editTask, deleteTask, toggleTaskStatus } = taskSlice.actions;

const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
    },
});

// Funkcja do tworzenia nowego sklepu
export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks: taskSlice.reducer,
        },
    });
};

export default store;