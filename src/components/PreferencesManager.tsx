import { useState } from 'react';
import { CustomerData, MarketingPreference, CommunicationChannels } from '@/lib/types/customer';
import { Switch } from '@headlessui/react';
import { Lock, CheckCircle2, Save } from 'lucide-react';

interface PreferencesManagerProps {
  customer: CustomerData;
  onUpdatePreferences: (updatedPreferences: MarketingPreference[]) => void;
}

export function PreferencesManager({ customer, onUpdatePreferences }: PreferencesManagerProps) {
  const [preferences, setPreferences] = useState(customer.marketingPreferences);

  const handleChannelToggle = (
    preferenceIndex: number,
    channelKey: string,
    value: boolean
  ) => {
    const updatedPreferences = [...preferences];
    const preference = updatedPreferences[preferenceIndex];
    
    if (preference.readonly) return;

    if (channelKey === 'all') {
      // Update the "all" channel value
      (preference.communicationChannels as any)[channelKey].value = value;
      
      // Update all other channels
      Object.keys(preference.communicationChannels).forEach((key) => {
        if (key !== 'all') {
          (preference.communicationChannels as any)[key].value = value;
        }
      });
    } else {
      // Update specific channel
      (preference.communicationChannels as any)[channelKey].value = value;
      
      // Update "all" channel based on other channels
      const allOtherChannelsEnabled = Object.keys(preference.communicationChannels)
        .filter(key => key !== 'all')
        .every(key => (preference.communicationChannels as any)[key].value);
      
      (preference.communicationChannels as any)['all'].value = allOtherChannelsEnabled;
    }

    setPreferences(updatedPreferences);
    onUpdatePreferences(updatedPreferences);
  };

  const handleSave = () => {
    onUpdatePreferences(preferences);
  };

  // Get all unique communication channels
  const allChannels = Array.from(
    new Set(
      preferences.flatMap(pref => 
        Object.keys(pref.communicationChannels)
      )
    )
  );

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-2 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900 whitespace-nowrap">Marketing Preferences</h2>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <table className="w-full h-full text-[11px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-1 py-1 text-left font-medium text-gray-900 whitespace-nowrap">Service</th>
              {allChannels.map(channel => (
                <th key={channel} className="px-1 py-1 text-center font-medium text-gray-900 whitespace-nowrap">
                  {preferences[0].communicationChannels[channel as keyof CommunicationChannels]?.description || channel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {preferences.map((preference, index) => (
              <tr 
                key={preference.preference}
                className={`${
                  preference.readonly ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-1 py-1 align-middle whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-900 text-[11px] whitespace-nowrap">
                      {preference.description}
                    </span>
                    {preference.readonly && (
                      <Lock className="h-2.5 w-2.5 text-gray-500" />
                    )}
                    {preference.optIn && (
                      <CheckCircle2 className="h-2.5 w-2.5 text-green-600" />
                    )}
                  </div>
                </td>
                {allChannels.map(channel => {
                  const channelData = preference.communicationChannels[channel as keyof CommunicationChannels];
                  if (!channelData) return <td key={channel} className="px-1 py-1" />;
                  
                  const isAllToggle = channel === 'all';
                  
                  return (
                    <td key={channel} className="px-1 py-1 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={channelData.value}
                          onChange={(checked) => handleChannelToggle(index, channel, checked)}
                          disabled={preference.readonly}
                          className={`${
                            channelData.value 
                              ? isAllToggle 
                                ? 'bg-green-600' 
                                : 'bg-blue-600' 
                              : 'bg-gray-200'
                          } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            preference.readonly ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <span
                            className={`${
                              channelData.value ? 'translate-x-4' : 'translate-x-0.5'
                            } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 