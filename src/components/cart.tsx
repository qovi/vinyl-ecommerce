'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  recordId: number;
  title: string;
  artist: string;
  price: number;
  cover: string;
  createdAt: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCart();
  }, []);

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      const newItem = event.detail;
      setCartItems(prevItems => [...prevItems, newItem]);
    };

    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
  }, []);

  const removeItem = async (id: number) => {
    try {
      const response = await fetch(`/api/cart?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <ShoppingBag className="w-6 h-6 pointer-events-none" />
      {cartItems.length > 0 && (
        <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs absolute top-1 -right-1 pointer-events-none">
          {cartItems.length}
        </span>
      )}

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <div
            className="fixed right-0 top-0 h-full w-full md:w-[450px] dark:bg-neutral-900 bg-white z-50 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800 border-gray-200">
              <h2 className="text-2xl font-bold">DIN INDKØBSKURV</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 dark:hover:bg-neutral-800 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Din indkøbskurv er tom</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b dark:border-neutral-800 border-gray-200 flex">
                      <div className="w-20 h-24 mr-4 border dark:border-neutral-800 border-gray-200">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          width={80}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <h4 className="text-sm">{item.artist}</h4>
                        <p className="mt-2 font-medium">{(item.price * 1.25).toFixed(2)} kr</p>

                        <div className="flex items-center mt-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="text-gray-500 dark:text-neutral-100 hover:text-gray-700 dark:hover:text-neutral-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t dark:border-neutral-800 border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-medium">TOTAL</span>
                    <span className="text-xl font-medium">{(totalPrice * 1.25).toFixed(2)} kr</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-neutral-100 mb-6">Moms inkluderet og fragt beregnet ved afslutning af køb</p>

                  <div className="flex items-center mb-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      id="age-confirmation"
                      className="mr-2"
                      onChange={(e) => setAgeConfirmed(e.target.checked)}
                    />
                    <label htmlFor="age-confirmation" className="text-sm">
                      Ved at handle i Vinyl Shop, bekræfter du, at du er over 18. Du kan blive bedt om at give ID ved modtagelse af levering.
                    </label>
                  </div>

                  {ageConfirmed ? (
                    <Link
                      href="/checkout"
                      className="block w-full bg-blue-600 dark:bg-blue-700 text-white text-center py-4 hover:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Afslut køb
                    </Link>
                  ) : (
                    <div className="block w-full bg-gray-400 dark:bg-neutral-800 text-white text-center py-4 cursor-not-allowed">
                      Afslut køb
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
