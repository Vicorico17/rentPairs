"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { UploadCloud } from "lucide-react"

export function Step5Verification({
  formData,
  updateFormData,
}: { formData: any; updateFormData: (data: any) => void }) {
  return (
    <div className="space-y-8 text-left">
      <div>
        <Label className="text-lg font-medium">Verification</Label>
        <p className="text-sm text-gray-500 mb-4">
          Verify your identity to build trust. This is optional but highly recommended.
        </p>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10">
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-300">
              <Label
                htmlFor="id-upload"
                className="relative cursor-pointer rounded-md font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                <span>Upload ID document</span>
                <Input id="id-upload" name="id-upload" type="file" className="sr-only" />
              </Label>
            </div>
            <p className="text-xs leading-5 text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="intro-message" className="text-lg font-medium">
          Intro Message (Optional)
        </Label>
        <p className="text-sm text-gray-500 mb-2">A short message to introduce yourself to potential hosts.</p>
        <Textarea
          id="intro-message"
          placeholder="Hi! I'm a clean and respectful software engineer looking for a quiet place to call home..."
          value={formData.introMessage}
          onChange={(e) => updateFormData({ introMessage: e.target.value })}
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  )
}
