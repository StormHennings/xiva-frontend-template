import { NextRequest, NextResponse } from 'next/server';
import { CustomerData } from '@/lib/types/customer';

const mockCustomerData: CustomerData = {
  phoneNumber: "27829940527",
  type: "vodacomMobile",
  marketingEmail: "",
  personId: "1234",
  lastUpdated: "2025-04-29T12:00:00Z",
  marketingPreferences: [
    {
      preference: "contentBillingNotifications",
      description: "Vodacom Billing Services",
      readonly: true,
      communicationChannels: {
        all: { value: true, description: "ALL" },
        email: { value: true, description: "E-mail" },
        call: { value: true, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: true, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    },
    {
      preference: "vodacomMobileServices",
      description: "Vodacom Mobile Services",
      communicationChannels: {
        all: { value: false, description: "ALL" },
        email: { value: false, description: "E-mail" },
        call: { value: true, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: false, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    },
    {
      preference: "vodacomFixedServices",
      description: "Vodacom Fixed Services",
      readonly: false,
      communicationChannels: {
        all: { value: false, description: "ALL" },
        email: { value: true, description: "E-mail" },
        call: { value: false, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: false, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    },
    {
      preference: "vodacomFinancialServices",
      description: "Vodacom Financial Services",
      communicationChannels: {
        all: { value: true, description: "ALL" },
        email: { value: true, description: "E-mail" },
        call: { value: true, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: true, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    },
    {
      preference: "vodacomContentServices",
      description: "Vodacom Content Services",
      optIn: true,
      communicationChannels: {
        all: { value: false, description: "ALL" },
        email: { value: true, description: "E-mail" },
        call: { value: false, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: false, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    },
    {
      preference: "vodacomPartnerOffers",
      description: "Vodacom Partner Offers",
      optIn: true,
      communicationChannels: {
        all: { value: false, description: "ALL" },
        email: { value: false, description: "E-mail" },
        call: { value: false, description: "Phone Call" },
        messaging: { value: true, description: "SMS" },
        ussdPushNotification: { value: false, description: "USSD" },
        whatsapp: { value: true, description: "Whatsapp" }
      }
    }
  ]
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cellphone = searchParams.get('cellphone');
  if (!cellphone) {
    return NextResponse.json({ error: 'Missing cellphone parameter' }, { status: 400 });
  }
  // In a real implementation, fetch data for the cellphone here
  // For now, return mock data
  return NextResponse.json({ ...mockCustomerData, phoneNumber: cellphone });
} 