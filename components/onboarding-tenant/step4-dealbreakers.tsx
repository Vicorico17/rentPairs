import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const dealbreakerOptions = [
  { id: "smoking", label: "Fumatul în casă" },
  { id: "pets", label: "Animale de companie în casă" },
  { id: "shared_bathroom", label: "Împărțirea băii" },
  { id: "no_private_space", label: "Lipsa unui spațiu privat garantat" },
  { id: "loud_music", label: "Muzică tare sau petreceri frecvente" },
  { id: "overnight_guests", label: "Musafiri peste noapte frecvenți" },
  { id: "live_in_host", label: "Proprietarul locuiește în proprietate" },
]

export function Step4Dealbreakers({
  formData,
  updateFormData,
}: { formData: any; updateFormData: (data: any) => void }) {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    const currentDealbreakers = formData.dealbreakers as string[]
    const newDealbreakers = checked ? [...currentDealbreakers, id] : currentDealbreakers.filter((item) => item !== id)
    updateFormData({ dealbreakers: newDealbreakers })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Care sunt lucrurile peste care nu poți trece?</h2>
      <p className="text-gray-600">
        Selectează oricare dintre acestea care sunt criterii eliminatorii absolute pentru tine. Acest lucru ne ajută să
        filtrăm potrivirile incompatibile.
      </p>
      <div className="space-y-4">
        {dealbreakerOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <Checkbox
              id={option.id}
              checked={formData.dealbreakers.includes(option.id)}
              onCheckedChange={(checked) => handleCheckboxChange(option.id, !!checked)}
            />
            <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
