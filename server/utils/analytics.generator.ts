import { Document, Model } from "mongoose";

interface MonthData {
  month: string; // e.g., "2023-01" (YYYY-MM format)
  count: number;
}

export async function generateLast12MonthData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const currentDate = new Date();
  const last12Months: MonthData[] = [];

  // Iterate over the last 12 months
  for (let i = 11; i >= 0; i--) {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      0,
      23,
      59,
      59,
      999
    ); // End of the month

    // Count the number of documents created within the month
    const count = await model.countDocuments({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    // Format the month as "YYYY-MM"
    const month = startOfMonth.toISOString().slice(0, 7);

    // Add the result to the last12Months array
    last12Months.push({ month, count });
  }

  return { last12Months };
}
