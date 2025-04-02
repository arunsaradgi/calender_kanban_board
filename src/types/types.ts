export interface Event {
    [x: string]: string;
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    time: string;
}

export interface EventsByDate {
    [date: string]: Event[];
}