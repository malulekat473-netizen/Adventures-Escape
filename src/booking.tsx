import React, { createContext, useContext, useMemo, useState } from 'react';
import { courses } from './courses';

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
};

type BookingValue = {
  selected: string[];
  toggleCourse: (slug: string) => void;
  discount: string;
  setDiscount: (value: string) => void;
  customer: CustomerDetails;
  setCustomer: (value: CustomerDetails) => void;
  subtotal: number;
  discountAmount: number;
  vat: number;
  total: number;
};

const BookingContext = createContext<BookingValue | null>(null);

export function BookingProvider({ children }: React.PropsWithChildren) {
  const [selected, setSelected] = useState<string[]>([]);
  const [discount, setDiscount] = useState('0');
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', date: '', guests: '1', message: '' });

  const totals = useMemo(() => {
    const subtotal = courses.filter((course) => selected.includes(course.slug)).reduce((sum, course) => sum + course.fee, 0);
    const rate = Math.min(100, Math.max(0, Number(discount) || 0));
    const discountAmount = subtotal * rate / 100;
    const vat = (subtotal - discountAmount) * 0.15;
    return { subtotal, discountAmount, vat, total: subtotal - discountAmount + vat };
  }, [selected, discount]);

  const value = useMemo(() => ({
    selected,
    toggleCourse: (slug: string) => setSelected((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]),
    discount,
    setDiscount,
    customer,
    setCustomer,
    ...totals,
  }), [selected, discount, customer, totals]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBooking must be used inside BookingProvider');
  return value;
}