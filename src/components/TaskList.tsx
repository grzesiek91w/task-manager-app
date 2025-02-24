import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus, editTask } from '../store/store';
import { Task } from '../types';
import './TaskList.css';

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const dispatch = useDispatch();
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');

   
    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 400);

        return () => {
            clearTimeout(handler);
        };

    }, [searchTerm]);

    // Filtrowanie i wyszukiwanie
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                              task.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // Sortowanie
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        console.log(dateA, dateB);
        return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });

    const handleEditClick = (task: Task) => {
        if (task.id) {
            setEditingTaskId(task.id);
            setEditedTitle(task.title);
            setEditedDescription(task.description);
        }
    };

    const validateFields = () => {
        if (!editedTitle && !editedDescription) {
            setError('Wypełnij wszystkie pola.');
            return false;
        }

        if (editedTitle.length < 3) {
            setError('Tytuł musi mieć co najmniej 3 znaki.');
            return false;
        }

        if (editedDescription.length < 5) {
            setError('Opis musi mieć co najmniej 5 znaków.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSaveClick = () => {
        if (editingTaskId) {
            if (!validateFields()) {
                alert('Popraw błędy przed zapisaniem zadania.');
                return;
            }

            dispatch(editTask({ id: editingTaskId, title: editedTitle, description: editedDescription }));
            setEditingTaskId(null);
            setEditedTitle('');
            setEditedDescription('');
        }
    };

    const handleCancelClick = () => {
        setEditingTaskId(null);
        setEditedTitle('');
        setEditedDescription('');
    };

    return (
        <div>
            
            <div className="selection-detailed">
                <input
                    type="text"
                    placeholder="Wyszukaj zadania..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input ml-4 mb-4 p-2 border border-gray-800 rounded"
                />

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="filter-select ml-4 mb-4 p-2 border border-gray-800 rounded"
                >
                    <option value="All">Wszystkie</option>
                    <option value="Do zrobienia">Do zrobienia</option>
                    <option value="W trakcie">W trakcie</option>
                    <option value="Zrobione">Zrobione</option>
                </select>

                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-button ml-4 mb-4 p-2 bg-gray-500 text-black rounded">
                    Sortuj {sortOrder === 'asc' ? 'malejąco' : 'rosnąco'}
                </button>
            </div>

            <div className="task-list">
                {sortedTasks.map(task => (
                    <div key={task.id} className="task-item ml-4 mb-4">
                        {String(editingTaskId) === task.id ? (
                            <div>
                                {error && <p className="text-red-500">{error}</p>} {/* Wyświetlanie błędu */}
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="task-edit-input"
                                    placeholder="Edytuj tytuł"
                                />
                                <input
                                    type="text"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className="task-edit-input"
                                    placeholder="Edytuj opis"
                                />
                                <button onClick={handleSaveClick} className="task-save-button">
                                    Zapisz
                                </button>
                                <button onClick={handleCancelClick} className="task-cancel-button">
                                    Anuluj
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="task-title">{task.title}</h3>
                                <p className="task-description">{task.description}</p>
                                <p className="task-status">{task.status}</p>

                                <div className="task-actions">

                                    <button onClick={() => dispatch(toggleTaskStatus(task.id))} className="task-toggle-button">

                                        Zmień status

                                    </button>

                                    <button onClick={() => handleEditClick(task)} className="task-edit-button ml-2">

                                        Edytuj

                                    </button>

                                    <button onClick={() => dispatch(deleteTask(task.id))} className="task-delete-button ml-2">

                                        Usuń

                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

};


export default TaskList;