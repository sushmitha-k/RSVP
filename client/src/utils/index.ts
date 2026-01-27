import type { IGuest } from "../pages/Home/GuestList/types";

export const exportToCSV = (guests: IGuest[], fileName = "data.csv") => {
  if (!guests.length) return;

  const headers = ["Name", "Email", "Status", "Plus Ones"];

  const rows = guests.map((guest) => [
    guest.name,
    guest.email,
    guest.status,
    guest.plus_ones ?? 0,
  ]);

  const csvRows = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    ),
  ];

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

export const getTotalsByStatus = <T extends { status: string }>(list: T[]) => {
  return list.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      acc.total += 1;
      return acc;
    },
    { total: 0 },
  );
};
