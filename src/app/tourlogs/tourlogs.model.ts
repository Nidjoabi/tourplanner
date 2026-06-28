export type TransporationType = 'Car' | 'Train' | 'Bus' | 'Plane' | 'Bicycle';

export interface Tour {
    id?: number;
    tourName: string;
    from: string;
    to: string;
    transportationType: TransporationType;
    distance: number;
    duration: number;
    description: string;
    image?: string;
}
