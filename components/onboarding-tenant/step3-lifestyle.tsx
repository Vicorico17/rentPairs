"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CardSelect } from "@/components/ui/card-select"
import { Bed, Users, Sun, Moon } from "lucide-react"

const formatTime = (hour: number) => `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 || hour === 24 ? "AM" : "PM"}`

export function Step3Lifestyle({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Care este stilul tău de viață?</h2>
      <div>
        <Label>Când te trezești și te culci de obicei?</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <Sun className="w-5 h-5 text-yellow-500" />{" "}
              <span className="font-semibold">{formatTime(formData.wakeTime)}</span>
            </div>
            <Slider
              value={[formData.wakeTime]}
              onValueChange={([val]) => updateFormData({ wakeTime: val })}
              min={4}
              max={12}
              step={1}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <Moon className="w-5 h-5 text-blue-500" />{" "}
              <span className="font-semibold">{formatTime(formData.sleepTime)}</span>
            </div>
            <Slider
              value={[formData.sleepTime]}
              onValueChange={([val]) => updateFormData({ sleepTime: val })}
              min={20}
              max={28}
              step={1}
            />
          </div>
        </div>
      </div>
      <div>
        <Label>Cât de des ai musafiri?</Label>
        <CardSelect
          value={formData.guestFrequency}
          onValueChange={(val) => updateFormData({ guestFrequency: val })}
          options={[
            { value: "Rar", label: "Rar" },
            { value: "Uneori", label: "Uneori" },
            { value: "Des", label: "Des" },
          ]}
        />
      </div>
      <div>
        <Label>Preferi o casă socială sau liniștită?</Label>
        <CardSelect
          value={formData.homeVibe}
          onValueChange={(val) => updateFormData({ homeVibe: val })}
          options={[
            { value: "Social", label: "Casă Socială", icon: Users },
            { value: "Quiet", label: "Sanctuar Liniștit", icon: Bed },
          ]}
        />
      </div>
      <div>
        <Label>Cât de curat/ă și ordonat/ă ești?</Label>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Puțin dezordonat</span>
          <span>Impecabil</span>
        </div>
        <Slider
          value={[formData.cleanliness]}
          onValueChange={([val]) => updateFormData({ cleanliness: val })}
          min={1}
          max={5}
          step={1}
        />
      </div>
    </div>
  )
}
