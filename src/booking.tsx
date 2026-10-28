import React, { createContext, useContext, useMemo, useState } from 'react';
import { COURSES } from './courses';

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
    const subtotal = COURSES.filter((course) => selected.includes(course.slug)).reduce((sum, course) => sum + course.fee, 0);
    const rate = Math.min(100, Math.max(0, Number(discount) || 0));
    const discountAmount = subtotal * rate / 100;
    const vat = (subtotal - discountAmount) * 0.15;
    return { subtotal, discountAmount, vat, total: subtotal - discountAmount + vat };
  }, [selected, discount]);

  const toggleCourse = (slug: string) => {
    setSelected(prev => prev.includes(slug)? prev.filter(s => s!== slug) : [...prev, slug]);
  };

  const value: BookingValue = {
    selected,
    toggleCourse,
    discount,
    setDiscount,
    customer,
    setCustomer,
    subtotal: totals.subtotal,
    discountAmount: totals.discountAmount,
    vat: totals.vat,
    total: totals.total,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}