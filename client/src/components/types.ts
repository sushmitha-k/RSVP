import type { IGuest } from "../pages/Home/GuestList/types";

export interface IConfirmDeleteModal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export interface ISearchInput {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export interface IButtonLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: React.ReactNode;
}

export interface IGuestTableProps {
  guests: IGuest[];
  startEdit: (guest: IGuest) => void;
  onDelete: (guest: IGuest) => void;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}
