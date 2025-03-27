import { db } from "@/server/db";
import { cart, record } from "@/server/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getCartItems() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("cart_session")?.value;

  if (!sessionToken) {
    return [];
  }

  const cartItems = await db
    .select({
      id: cart.id,
      recordId: cart.recordId,
      title: record.title,
      artist: record.artist,
      price: record.price,
      cover: record.cover,
      createdAt: cart.createdAt,
    })
    .from(cart)
    .innerJoin(record, eq(cart.recordId, record.id))
    .where(
      and(
        eq(cart.sessionToken, sessionToken),
        sql`unixepoch() < ${cart.expiresAt}`
      )
    );

  return cartItems;
}

export async function removeFromCart(id: number) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("cart_session")?.value;

  if (!sessionToken) {
    return;
  }

  await db
    .delete(cart)
    .where(
      and(
        eq(cart.id, id),
        eq(cart.sessionToken, sessionToken)
      )
    );
}

export async function clearCart() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("cart_session")?.value;

  if (!sessionToken) {
    return;
  }

  await db
    .delete(cart)
    .where(eq(cart.sessionToken, sessionToken));
}

export async function getCartCount() {
  const cartItems = await getCartItems();
  return cartItems.length;
} 