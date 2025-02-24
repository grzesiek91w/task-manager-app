// src/App.tsx
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store, { addTask } from './store/store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskManagerLayout from './components/layouts/TaskManagerLayout';
import { Task } from './types';
import './styles/styles.css';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.tasks);


    useEffect(() => {
        if (tasks.length === 0) {
            const initialTasks: Task[] = [
                { title: 'Zadanie 1', description: 'Opis zadania 1', status: 'Do zrobienia', createdAt: new Date().toISOString() },
                { title: 'Zadanie 2', description: 'Opis zadania 2', status: 'W trakcie', createdAt: new Date().toISOString() },
                { title: 'Zadanie 3', description: 'Opis zadania 3', status: 'Zrobione', createdAt: new Date().toISOString() },
                { title: 'Zadanie 4', description: 'Opis zadania 4', status: 'Do zrobienia', createdAt: new Date().toISOString() },
                { title: 'Zadanie 5', description: 'Opis zadania 5', status: 'W trakcie', createdAt: new Date().toISOString() },
                { title: 'Zadanie 6', description: 'Opis zadania 6', status: 'Zrobione', createdAt: new Date().toISOString() },
                { title: 'Zadanie 7', description: 'Opis zadania 7', status: 'Do zrobienia', createdAt: new Date().toISOString() },
                { title: 'Zadanie 8', description: 'Opis zadania 8', status: 'W trakcie', createdAt: new Date().toISOString() },
                { title: 'Zadanie 9', description: 'Opis zadania 9', status: 'Zrobione', createdAt: new Date().toISOString() },
                { title: 'Zadanie 10', description: 'Opis zadania 10', status: 'Do zrobienia', createdAt: new Date().toISOString() },
            ];
    
            // Ustawienie początkowej daty utworzenia
            let lastCreatedAt = new Date();
    
            initialTasks.forEach((task, index) => {
                // Ustawienie daty utworzenia dla każdego zadania
                task.createdAt = new Date(lastCreatedAt.getTime() + index).toISOString();
                console.log('Dodawanie zadania:', task);
                dispatch(addTask(task));
            });
        }
    }, [dispatch, tasks]);

    return (

        <Router>

            <div className= 'bg-white text-black'>

                <Routes>
                    <Route path="/" element={<Navigate to="/task-manager" />} />
                    <Route path="/task-manager" element={<TaskManagerLayout />}>

                        <Route path="tasks" element={<TaskList tasks={tasks} />} />

                        <Route path="add-task" element={<TaskForm />} />

                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

            </div>

        </Router>

    );

};

const Root: React.FC = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;