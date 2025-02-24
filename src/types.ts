export interface Task {
    id?: string;
    title: string;
    description: string;
    status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
    createdAt: string;
}