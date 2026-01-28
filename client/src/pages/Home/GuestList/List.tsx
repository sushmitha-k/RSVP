import { useState } from "react";
import ConfirmDeleteModal from "../../../components/DeleteModal";
import { GuestTable } from "../../../components/Table";
import { Pagination } from "../../../components/Pagination";
import { useDeleteGuest } from "../../../hooks/useDeleteGuest";
import { useGuestContext } from "../../../context";
import { GuestTableShimmer } from "../../../components/TableShimmer";
import { useGuestList } from "../../../context/GuestListContext";
import type { IGuest, IGuestTableProps } from "./types";

import styles from "./index.module.scss";

const PAGE_SIZE = 5;

export const GuestList = ({ guests, isLoading }: IGuestTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<IGuest | null>(null);

  const { startEdit } = useGuestContext();
  const { refetch } = useGuestList();

  const { isDeleting, deleteGuest } = useDeleteGuest({
    onSuccess: () => {
      refetch();
      setShowDeleteModal(false);
      setSelectedGuest(null);
    },
  });

  const totalPages = Math.ceil(guests.length / PAGE_SIZE);

  const paginatedGuests = guests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className={styles.tableWrapper}>
      {isLoading ? (
        <GuestTableShimmer />
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Guest Name</th>
              <th>Status</th>
              <th>Plus Ones</th>
              <th>Actions</th>
            </tr>
          </thead>

          <GuestTable
            guests={paginatedGuests}
            startEdit={startEdit}
            onDelete={(guest) => {
              setSelectedGuest(guest);
              setShowDeleteModal(true);
            }}
          />
        </table>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />

      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => selectedGuest && deleteGuest(selectedGuest.id)}
        isLoading={isDeleting}
      />
    </div>
  );
};
