export interface Booking {
    id?: string; // Optional if you are using MongoDB's default _id field
    customerId: string; // Assuming customerId is stored as ObjectId reference
    passengerDetails: Passenger[];
    email: string;
    phoneNumber: string;
    fare: number;
    status: string;
    bookingDate: string;
    busId: string; // Assuming busId is stored as ObjectId reference
    seats: number[];
    departureDetails: TripDetails;
    arrivalDetails: TripDetails;
    duration: string;
    isBusinessTravel?: boolean;
    businessDetails?: BusinessDetails;
    isInsurance?: boolean;
    isCovidDonated?: boolean;
  }
  
  interface Passenger {
    name: string;
    gender: string;
    age: number;
  }
  
  interface TripDetails {
    city: string;
    location: string;
    time: number | string;
  }
  
  interface BusinessDetails {
    gst?: string;
    name?: string;
    address?: string;
    email?: string;
  }
  