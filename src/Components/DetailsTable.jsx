/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function DetailsTable({ data }) {
  if (!data) return null;
  return (
    <Table
      aria-label="Example table with client side pagination"
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">Description</TableColumn>
        <TableColumn key="role">Area</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Private office</TableCell>
          <TableCell>{data.private_office}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Big office</TableCell>
          <TableCell>{data.big_office}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Storage area</TableCell>
          <TableCell>{data.storage_area}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Server room</TableCell>
          <TableCell>{data.server_room_area}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Corridor area</TableCell>
          <TableCell>{data.corridor_area}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kitchen&Toilet</TableCell>
          <TableCell>{data.kitchen_toalett}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Open area</TableCell>
          <TableCell>{data.open_area}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Support area</TableCell>
          <TableCell>{data.support_area}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Area</TableCell>
          <TableCell>{data.total_area}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
