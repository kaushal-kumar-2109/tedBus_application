export interface Bus {
    _id: string; // Required - always present on documents returned from MongoDB
    operatorName: string;
    busType: string;
    departureTime: string;
    rating: number[];
    totalSeats?: number;
    routes: string; // Assuming routes are stored as ObjectId references
    images: string;
    liveTracking: number;
    reschedulable: number;
  }