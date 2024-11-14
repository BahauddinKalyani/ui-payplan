import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

// Function to convert "mm-dd-yyyy" string back to Date object
export function parseDate(dateString: string): Date {
  const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;

    // Test the date string against the regex
    if (!regex.test(dateString)) {
        return new Date();
    }

  const [month, day, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // Months are 0-based in Date constructor
}