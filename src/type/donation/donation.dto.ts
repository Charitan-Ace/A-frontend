export interface DonationDto {
  id: number;
  amount: number;
  message: string;
  transactionStripeId: string | null;
  projectId: string;
  donorId: string;
  createdAt: string;
}
