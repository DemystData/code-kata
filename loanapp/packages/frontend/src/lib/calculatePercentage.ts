export const calculatePercentage = (amountString: string, percentage: number): number => {
    const amount = parseFloat(amountString);
    return (percentage / 100) * amount;
  };