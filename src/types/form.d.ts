export {};

declare global {
  interface Expense {
    subject: string;
    expenseType: 'income' | 'expenses';
    dateTime: string;
    merchant: string;
    description: string;
    category: string;
    amount: number;
  }

  interface ExpenseAPI extends Expense {
    id: string;
  }
}
