'use client'
import { useEffect, useState } from 'react'
import { getSettings, updateSetting } from '@/lib/settings'

export default function SettingsManager() {
  const [settings, setSettings] = useState([])

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const result = await getSettings()
    setSettings(result)
  }

  const handleChange = async (id: string, value: string) => {
    await updateSetting(id, value)
    fetchSettings()
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>
      {settings.map((setting) => (
        <div key={setting.id} className="flex gap-2 items-center">
          <label className="w-64 font-medium">{setting.key}</label>
          <input
            type="text"
            defaultValue={setting.value}
            onBlur={(e) => handleChange(setting.id, e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      ))}
    </div>
  )
}