'use client'

import { useTransition } from 'react'

interface AddToCartButtonProps {
  id: number
  addToCart: (formData: FormData) => Promise<void>
}

export function AddToCartButton({ id, addToCart }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    const formData = new FormData()
    formData.append('id', id.toString())
    
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
