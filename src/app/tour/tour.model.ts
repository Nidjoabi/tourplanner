export type TransporationType = 'Car' | 'Bus' | 'Bicycle';

export interface Tour {
    id?: string;
    tourName: string;
    from: string;
    to: string;
    transportationType: TransporationType;
    distance: number;
    duration: number;
    description: string;
    image?: string;
}
