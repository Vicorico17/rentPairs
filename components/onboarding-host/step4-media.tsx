"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, X } from "lucide-react"

interface FormData {
  photos: string[]
}

export function Step4Media({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) {
  const handleAddPhoto = () => {
    // For now, we'll add placeholder photos
    // In a real app, this would open a file picker
    const placeholderPhoto = `/placeholder.svg?height=200&width=300&text=Proprietate+${formData.photos.length + 1}`
    updateFormData({ 
      photos: [...formData.photos, placeholderPhoto] 
    })
  }

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index)
    updateFormData({ photos: updatedPhotos })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Fotografii Proprietate</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Adaugă fotografii cu proprietatea ta pentru a atrage mai mulți chiriași potențiali.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {formData.photos.map((photo, index) => (
          <Card key={index} className="relative group">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={photo} 
                alt={`Fotografie proprietate ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add Photo Button */}
        {formData.photos.length < 6 && (
          <Card className="aspect-video bg-gray-50 dark:bg-gray-900 border-dashed border-2 border-gray-300 dark:border-gray-600">
            <Button
              variant="ghost"
              className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={handleAddPhoto}
            >
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-sm">Adaugă Fotografie</span>
            </Button>
          </Card>
        )}
      </div>

      {formData.photos.length === 0 && (
        <div className="text-center py-8">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Nu ai adăugat încă nicio fotografie.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Recomandăm cel puțin 3-5 fotografii pentru rezultate mai bune.
          </p>
        </div>
      )}

      {formData.photos.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formData.photos.length} {formData.photos.length === 1 ? 'fotografie adăugată' : 'fotografii adăugate'}
          {formData.photos.length < 6 && ` (poți adăuga până la ${6 - formData.photos.length} mai multe)`}
        </div>
      )}
    </div>
  )
}
