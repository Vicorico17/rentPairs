"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, X, Upload, Loader2 } from "lucide-react"
import { uploadPropertyImage, deletePropertyImage } from "@/lib/supabase"
import { useState, useRef } from "react"
import { toast } from "@/hooks/use-toast"

interface ImageData {
  url: string
  path: string // For deletion
}

interface FormData {
  photos: ImageData[]
}

export function Step4Media({ formData, updateFormData }: { formData: FormData; updateFormData: (data: Partial<FormData>) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadingCount, setUploadingCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // Check if adding these files would exceed the limit
    const totalFiles = formData.photos.length + files.length
    if (totalFiles > 6) {
      toast({
        title: "Prea multe fotografii",
        description: `Poți adăuga maximum 6 fotografii. Ai ${formData.photos.length} și încerci să adaugi ${files.length}.`,
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)
    setUploadingCount(files.length)

    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        console.log('📤 Starting upload for:', file.name)
        const result = await uploadPropertyImage(file)
        
        if (result) {
          console.log('✅ Upload completed:', result)
          return result
        } else {
          throw new Error('Upload failed')
        }
      } catch (error) {
        console.error('❌ Upload error for', file.name, ':', error)
        toast({
          title: "Eroare la încărcare",
          description: error instanceof Error ? error.message : `Nu s-a putut încărca ${file.name}`,
          variant: "destructive"
        })
        return null
      }
    })

    try {
      const results = await Promise.all(uploadPromises)
      const successfulUploads = results.filter((result): result is ImageData => result !== null)
      
      if (successfulUploads.length > 0) {
        updateFormData({ 
          photos: [...formData.photos, ...successfulUploads] 
        })
        
        toast({
          title: "Succes!",
          description: `${successfulUploads.length} ${successfulUploads.length === 1 ? 'fotografie încărcată' : 'fotografii încărcate'} cu succes.`
        })
      }
    } catch (error) {
      console.error('❌ Batch upload error:', error)
      toast({
        title: "Eroare la încărcare",
        description: "A apărut o eroare neașteptată la încărcarea fotografiilor.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      setUploadingCount(0)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemovePhoto = async (index: number) => {
    const photoToRemove = formData.photos[index]
    
    try {
      // Delete from Supabase Storage
      const deleted = await deletePropertyImage(photoToRemove.path)
      
      if (deleted) {
        // Remove from local state
        const updatedPhotos = formData.photos.filter((_, i) => i !== index)
        updateFormData({ photos: updatedPhotos })
        
        toast({
          title: "Fotografie ștearsă",
          description: "Fotografia a fost ștearsă cu succes."
        })
      } else {
        toast({
          title: "Eroare la ștergere",
          description: "Nu s-a putut șterge fotografia din storage.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('❌ Delete error:', error)
      toast({
        title: "Eroare la ștergere",
        description: "A apărut o eroare la ștergerea fotografiei.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Fotografii Proprietate</Label>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Adaugă fotografii cu proprietatea ta pentru a atrage mai mulți chiriași potențiali.
          Mărime maximă: 5MB per fotografie. Formate acceptate: JPEG, PNG, WebP, GIF.
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {formData.photos.map((photo, index) => (
          <Card key={index} className="relative group">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={photo.url} 
                alt={`Fotografie proprietate ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image load error:', photo.url)
                  // You could set a fallback image here
                }}
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

        {/* Upload Progress Cards */}
        {isUploading && Array.from({ length: uploadingCount }).map((_, index) => (
          <Card key={`uploading-${index}`} className="aspect-video bg-gray-50 dark:bg-gray-900 border-dashed border-2 border-blue-300 dark:border-blue-600">
            <div className="w-full h-full flex flex-col items-center justify-center text-blue-500 dark:text-blue-400">
              <Loader2 className="h-8 w-8 mb-2 animate-spin" />
              <span className="text-sm">Se încarcă...</span>
            </div>
          </Card>
        ))}

        {/* Add Photo Button */}
        {formData.photos.length < 6 && !isUploading && (
          <Card className="aspect-video bg-gray-50 dark:bg-gray-900 border-dashed border-2 border-gray-300 dark:border-gray-600">
            <Button
              variant="ghost"
              className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={handleFileSelect}
            >
              <Upload className="h-8 w-8 mb-2" />
              <span className="text-sm">Încarcă Fotografii</span>
            </Button>
          </Card>
        )}
      </div>

      {formData.photos.length === 0 && !isUploading && (
        <div className="text-center py-8">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Nu ai adăugat încă nicio fotografie.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Recomandăm cel puțin 3-5 fotografii pentru rezultate mai bune.
          </p>
          <Button onClick={handleFileSelect} className="mt-2">
            <Upload className="h-4 w-4 mr-2" />
            Încarcă Prima Fotografie
          </Button>
        </div>
      )}

      {formData.photos.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formData.photos.length} {formData.photos.length === 1 ? 'fotografie adăugată' : 'fotografii adăugate'}
          {formData.photos.length < 6 && ` (poți adăuga până la ${6 - formData.photos.length} mai multe)`}
        </div>
      )}

      {isUploading && (
        <div className="text-center py-2">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Se încarcă {uploadingCount} {uploadingCount === 1 ? 'fotografie' : 'fotografii'}...
          </p>
        </div>
      )}
    </div>
  )
}
