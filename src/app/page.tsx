'use client';

import { useState, useEffect } from 'react';
import { PreferencesManager } from '@/components/PreferencesManager';
import { CustomerData } from '@/lib/types/customer';

// Mock data for development
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

export default function PortletPage() {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch data based on the phone number
    // passed from the parent application
    const fetchCustomerData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCustomer(mockCustomerData);
      } catch (err) {
        setError('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleUpdatePreferences = async (updatedPreferences: CustomerData['marketingPreferences']) => {
    // In a real implementation, this would make an API call to update preferences
    console.log('Updating preferences:', updatedPreferences);
    if (customer) {
      setCustomer({
        ...customer,
        marketingPreferences: updatedPreferences
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1200px] mx-auto">
        <PreferencesManager 
          customer={customer} 
          onUpdatePreferences={handleUpdatePreferences} 
        />
      </div>
    </div>
  );
}
