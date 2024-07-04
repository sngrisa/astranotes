export interface TrelloListItemElement {
    id?: string | number;
    termTask: string;
}

export interface ListProject{
    id?: string | number;
    title: string;
    items: TrelloListItemElement[];
}