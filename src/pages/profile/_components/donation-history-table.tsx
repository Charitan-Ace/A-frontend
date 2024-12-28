import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { DonationDto } from "@/type/donation/donation.dto";

interface DonationHistoryProps {
  donations: DonationDto[];
}

const DonationHistory = ({ donations } : DonationHistoryProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Donation History</h2>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>{donation.id}</TableCell>
              <TableCell>{donation.project}</TableCell>
              <TableCell>{donation.date}</TableCell>
              <TableCell>{donation.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <p className="text-center">End of Donation History</p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export { DonationHistory };
