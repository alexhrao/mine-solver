export interface Box {
    
    row: number;
    col: number;
    mines: number; // -1 if has a mine!

    flagged: boolean;
    isShown: boolean;

}