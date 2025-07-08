"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UploadCloud } from "lucide-react"

export function Step4Media({ formData, updateFormData }: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <Label>Property Photos</Label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10">
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-300">
              <Label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                <span>Upload a file</span>
                <Input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
              </Label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your property..."
          className="mt-1"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
      </div>
    </div>
  )
}
