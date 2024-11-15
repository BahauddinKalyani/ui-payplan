import { useState, useEffect, useCallback } from 'react';
import { transactionAPI } from '@/api/transactionAPI'
import { Payment } from '@/app/dashboard/columns';

export function useTransactionsWithCalendar(initialTransactions = []) {
  const [transactions, setTransactionsInternal] = useState<Payment[]>(initialTransactions);
  const [calendarData, setCalendarData] = useState({});

  const fetchCalendarData = useCallback(async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const cdata = await transactionAPI.get_calendar_data(userId);
      setCalendarData(cdata.data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  }, []);

  const setTransactions = useCallback((newTransactions: Payment[]) => {
    setTransactionsInternal(newTransactions);
    fetchCalendarData();
  }, [fetchCalendarData]);

  // Initial fetch of calendar data
  useEffect(() => {
    fetchCalendarData();
  }, [fetchCalendarData]);

  return { transactions, setTransactions, calendarData };
}