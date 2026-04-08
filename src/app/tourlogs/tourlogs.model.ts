export type TransporationType = 'Car' | 'Train' | 'Bus' | 'Plane' | 'Bicycle';

export interface Tour {
    id?: number;
    tripName: string;
    from: string;
    to: string;
    transportation: TransporationType;
    distance: number;
    duration: number;
    description: string;
    image?: string;
}