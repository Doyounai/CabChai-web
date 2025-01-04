export {};

declare global {
  type Expense = {
    subject: string;
    expenseType: 'income' | 'expenses';
    dateTime: string;
    merchant: string;
    description: string;
    category: string;
    amount: number;
  };
}
