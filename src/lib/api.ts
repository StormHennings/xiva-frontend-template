import { CustomerData } from './types/customer';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export async function getCustomerPreferences(phoneNumber: string): Promise<CustomerData> {
  const res = await fetch(`${API_BASE}/preferences/customer/${encodeURIComponent(phoneNumber)}`);
  if (!res.ok) throw new Error('Failed to fetch customer preferences');
  return res.json();
}

export async function saveCustomerPreferences(data: CustomerData): Promise<void> {
  const res = await fetch(`${API_BASE}/preferences/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save customer preferences');
} 