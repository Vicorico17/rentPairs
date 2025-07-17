"use client"

import * as React from "react"
import { format } from "date-fns"
import { ro } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean | ((date: Date) => boolean)
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Selectează data",
  disabled = false,
  className
}: DatePickerProps) {
  // Handle disabled prop - if it's a boolean, convert to function
  const disabledFunction = React.useMemo(() => {
    if (typeof disabled === 'function') {
      return disabled
    }
    
    if (disabled === true) {
      return () => true
    }
    
    // Default behavior: disable past dates
    return (date: Date) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date < today
    }
  }, [disabled])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={typeof disabled === 'boolean' ? disabled : false}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd MMMM yyyy", { locale: ro }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={disabledFunction}
          initialFocus
          locale={ro}
        />
      </PopoverContent>
    </Popover>
  )
} 