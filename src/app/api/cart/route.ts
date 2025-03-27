import { NextRequest, NextResponse } from 'next/server';
import { getCartItems, removeFromCart } from '@/lib/cart';

export async function GET() {
  try {
    const cartItems = await getCartItems();
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart items' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Item ID is required' },
      { status: 400 }
    );
  }

  try {
    await removeFromCart(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
} 