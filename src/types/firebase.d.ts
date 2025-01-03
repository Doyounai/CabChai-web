export {};

declare global {
  type User = {
    uid: string;
    username: string;
  } | null;

  type Category = {
    id: string;
    name: string;
    priority: number;
    usageLimit: number;
    color: string;
  };
}
