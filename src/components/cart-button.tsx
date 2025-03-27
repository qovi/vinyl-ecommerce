'use client'

import { useTransition } from 'react'

interface AddToCartButtonProps {
  id: number
  addToCart: (formData: FormData) => Promise<void>
  title: string
  artist: string
  price: number
  cover: string
}

export function AddToCartButton({ id, addToCart, title, artist, price, cover }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    const formData = new FormData()
    formData.append('id', id.toString())

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
      addToCart(formData)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-blue-700 text-white px-4 py-6 rounded-sm w-1/2 text-center cursor-pointer disabled:opacity-75"
    >
      Læg i kurven
    </button>
  )
}
