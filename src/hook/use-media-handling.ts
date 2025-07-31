'use client'

import { UserInput } from '@/type';
import { useCallback } from 'react';

export const useMediaHandling = () => {

  const handleMediaPicker = useCallback((e: React.ChangeEvent<HTMLInputElement>, setMessageInput: (value: React.SetStateAction<UserInput>) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type?.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image()
          img.onload = () => {
            setMessageInput((prev) => ({
              ...prev,
              media: {
                url: URL.createObjectURL(file),
                type: "image",
                file,
                props: {
                  width: img.width,
                  height: img.height,
                  size: file.size,
                  mime_type: file.type,
                  name: file.name,
                  extension: file.name.split(".").pop()
                }
              },
              type: "image"
            }))
          }
          img.src = reader.result as string
        }
        reader.readAsDataURL(file)
        return
      }
      setMessageInput((prev) => ({
        ...prev,
        media: {
          url: URL.createObjectURL(file),
          type: "image",
          file
        },
        type: "image"
      }))
    }
  }, [])

  return { handleMediaPicker }
} 