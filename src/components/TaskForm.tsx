import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../store/store';
import { Task } from '../types';
import './TaskForm.css';

const TaskForm: React.FC<{ initialData?: Task }> = ({ initialData }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [status, setStatus] = useState(initialData ? initialData.status : 'Do zrobienia');
    const [error, setError] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            validateFields();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [title, description]);

    const validateFields = () => {
        
        if (!title && !description) {
            setError('Proszę wypełnić wszystkie pola.');
            return;
        }

        if (title.length < 3) {
            setError('Tytuł musi mieć co najmniej 3 znaki.');
            return;
        }

        if (description.length < 5) {
            setError('Opis musi mieć co najmniej 5 znaków.');
            return;
        }

        setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !description) {
            setError('Wypełnij wszystkie pola.');
            return;
        }

        if (error) {
            alert('Popraw błędy przed zapisaniem zadania.');
            return;
        }

        const taskData = {
            title,
            description,
            status,
        };

        if (initialData) {
            dispatch(editTask({ ...taskData, id: initialData.id }));
        } else {
            dispatch(addTask(taskData));
        }

        setTitle('');
        setDescription('');
        setStatus('Do zrobienia');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form max-w-md">
            <h2 className="text-xl font-bold ml-4 mb-4">Dodaj nowe zadanie</h2>

            {error && <p className="text-red-500 ml-4 mb-4">{error}</p>}

            <div className="ml-4 mb-4">
                <input
                    type="text"
                    placeholder="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input w-full"
                    required
                />
            </div>

            <div className="ml-4 mb-4">
                <input
                    type="text"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="task-input w-full"
                    required
                />
            </div>

            <div className="ml-4 mb-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Do zrobienia' | 'W trakcie' | 'Zrobione')}
                    className="task-select w-full"
                >
                    <option value="Do zrobienia">Do zrobienia</option>
                    <option value="W trakcie">W trakcie</option>
                    <option value="Zrobione">Zrobione</option>
                </select>
            </div>

            <button type="submit" className="task-button w-full ml-4" disabled={!!error}>Zapisz zadanie</button>
        </form>
    );
};

export default TaskForm;