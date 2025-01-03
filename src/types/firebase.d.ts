export {};

declare global {
  type User =
    | {
        name: string;
        age: string;
      }
    | undefined;

  type Category = {
    id: string;
    name: string;
    usageLimit: number;
  };
}
