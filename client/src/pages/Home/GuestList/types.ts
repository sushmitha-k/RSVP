export type Status = "confirmed" | "pending" | "declined";

export interface IGuest {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: Status;
  plus_ones: number;
  isNew?: boolean;
}

export interface IGuestTableProps {
  guests: IGuest[];
  isLoading: boolean;
}
