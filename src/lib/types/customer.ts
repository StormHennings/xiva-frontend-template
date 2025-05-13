export interface CommunicationChannel {
  value: boolean;
  description: string;
}

export interface CommunicationChannels {
  email?: CommunicationChannel;
  call?: CommunicationChannel;
  messaging?: CommunicationChannel;
  ussdPushNotification?: CommunicationChannel;
  whatsapp?: CommunicationChannel;
  all?: CommunicationChannel;
}

export interface MarketingPreference {
  preference: string;
  description: string;
  readonly?: boolean;
  optIn?: boolean;
  communicationChannels: CommunicationChannels;
}

export interface CustomerData {
  phoneNumber: string;
  type: string;
  marketingEmail: string;
  personId: string;
  lastUpdated: string;
  marketingPreferences: MarketingPreference[];
} 