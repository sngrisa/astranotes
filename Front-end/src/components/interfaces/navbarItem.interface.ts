export interface NavbarItemMenu {
    id?: string | number;
    title: string;
    icon: string;
    url?: string;
}

export interface Project {
    id?: string | number;
    title: string;
    favourite: boolean;
    type: boolean;
    url?: string;
    list?: Project[];
}