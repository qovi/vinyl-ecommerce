'use client'

import { useTransition, useState } from 'react'

interface AddToCartButtonProps {
  id: number
  title: string
  artist: string
  price: number
  cover: string
}

export function AddToCartButton({ id, title, artist, price, cover }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setError(null)
    const tempId = Math.floor(Math.random() * 1000000)

    const event = new CustomEvent('cartUpdate', {
      detail: {
        id: tempId,
        recordId: id,
        title,
        artist,
        price,
        cover,
        createdAt: Math.floor(Date.now() / 1000)
      }
    })
    window.dispatchEvent(event)

    startTransition(() => {
      // No need for server request anymore
      setError(null)
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="bg-blue-700 text-white px-4 py-6 rounded-sm w-1/2 text-center cursor-pointer disabled:opacity-75"
      >
        Læg i kurven
      </button>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
