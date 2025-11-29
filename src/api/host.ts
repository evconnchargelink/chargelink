// api/host.ts

export type ChargerData = {
    id: string;
    name: string;
    location: string;
    price: number;
    slots: number;
  };
  
  export type EarningsData = {
    totalEarnings: number;
    lastMonth: number;
    totalBookings: number;
  };
  
  export async function fetchChargers(): Promise<ChargerData[]> {
    return [
      { id: "1", name: "EV Station Sector 21", location: "Gurgaon", price: 18, slots: 4 },
      { id: "2", name: "FastCharge Station", location: "Delhi", price: 20, slots: 2 },
    ];
  }
  
  export async function addCharger(data: ChargerData) {
    return { success: true, added: data };
  }
  
  export async function fetchEarnings(): Promise<EarningsData> {
    return {
      totalEarnings: 5400,
      lastMonth: 1200,
      totalBookings: 23,
    };
  }
  