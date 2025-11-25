// api/payments.ts

export type Transaction = {
    id: string;
    type: "add" | "payment" | "refund";
    amount: number;
    date: string;
  };
  
  export async function addMoney(amount: number) {
    return {
      success: true,
      message: `₹${amount} added (dummy)`,
    };
  }
  
  export async function fetchTransactions(): Promise<Transaction[]> {
    return [
      { id: "tr1", type: "add", amount: 500, date: "23 Jan 2025" },
      { id: "tr2", type: "payment", amount: -120, date: "22 Jan 2025" },
      { id: "tr3", type: "refund", amount: 120, date: "20 Jan 2025" },
    ];
  }
  
  export async function paymentEV(amount: number) {
    return {
      success: true,
      transactionId: "PAY98765",
      message: `Paid ₹${amount} (dummy)`,
    };
  }
  