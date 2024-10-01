export interface Task {
    title: string;
    description?: string;
    aFazer: boolean;
    fazendo: boolean;
    feito: boolean;
    date: string;
}

export interface EditTask {
    title: string;
    description?: string;
    aFazer: boolean;
    fazendo: boolean;
    feito: boolean;
}
