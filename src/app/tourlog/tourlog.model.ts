export interface Tourlog {
  id: string;
  tourId: string;
  createdAt: Date;
  updatedAt?: Date;
  comment: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  totalTime: number;
  totalDistance: number;
  ratings: number;
  childFriendly: boolean;
}

export interface CreateTourlogDto {
  comment: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  totalTime: number;
  totalDistance: number;
  ratings: number;
  childFriendly: boolean;
}