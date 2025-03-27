import { AddToCartButton } from "@/components/cart-button"
import { db } from "@/server/db"
import { cart, record } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { v4 as uuidv4 } from 'uuid'

async function addToCart(formData: FormData) {
    "use server"
    const id = parseInt(formData.get("id") as string)
    
    const cookieStore = await cookies()
    let sessionToken = cookieStore.get('cart_session')?.value
    
    if (!sessionToken) {
        sessionToken = uuidv4()
        cookieStore.set('cart_session', sessionToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        })
    }
    
    try {
        const existingItem = await db.query.cart.findFirst({
            where: (cart) => 
                eq(cart.recordId, id) && 
                eq(cart.sessionToken, sessionToken)
        })

        if (!existingItem) {
            await db.insert(cart).values({
                recordId: id,
                sessionToken: sessionToken,
            })
        }
    } catch (error) {
        console.error('Failed to add to cart:', error)
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const records = await db.query.record.findFirst({
        where: eq(record.id, parseInt(slug))
    })

    if (!records) {
        return <div>Record not found</div>
    }

    const allRecords = await db.query.record.findMany()

    return (
        <>
            <div className="bg-neutral-50 w-full h-10 items-center flex px-4 border-b border-black">
                <Link
                    href={"/"}
                    className="hover:text-blue-600 text-black/50"
                >
                    <span className="relative after:absolute after:bg-blue-600 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                        Home
                    </span>
                </Link>
                <span className="px-2 text-black/50">/</span>
                <Link
                    href={`/products/${slug}`}
                    className="hover:text-blue-600 text-black/50"
                >
                    {records?.title
                        .replace(/-/g, " ")
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black">
                <div className="col-span-1 flex items-center justify-center h-full py-8 px-4 md:border-r border-black">
                    <Image
                        src={records?.cover}
                        alt={records?.title}
                        width={500}
                        height={500}
                        className="object-cover max-w-[80%] md:max-w-full"
                    />
                </div>

                <div className="col-span-1 lg:col-span-2">
                    <div className="flex flex-col border-b border-black py-4 px-4 gap-2 justify-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black">{records.title}</h1>
                        <p className="text-black/50">{records.artist}, {records.year}</p>
                    </div>
                    <div className="flex flex-col border-b border-black py-4 px-4 gap-2 justify-center">
                        <h2 className="text-2xl font-medium text-black">{records.price * 1.25} kr</h2>
                        <p className="text-black/50">Inkl. moms</p>
                    </div>
                    <div className="flex flex-col border-b border-black py-4 px-4 gap-2 justify-center">
                        <AddToCartButton id={records.id} addToCart={addToCart} />
                    </div>
                    <div className="p-4">
                        <p className="text-black/50">{records.description || "Der er ingen beskrivelse tilgængelig for denne plade."}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center border-b border-black py-4">
                <h2 className="text-2xl font-medium text-black">DU VIL MÅSKE OGSÅ KUNNE LIDE</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {Array.isArray(allRecords) ? allRecords
                    .filter((record) => record.id !== records.id)
                    .slice(0, 6)
                    .map((record) => (
                        <Link
                            key={record.id}
                            href={`/products/${record.id}`}
                            className="flex flex-col border-r border-b border-black"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={record.cover}
                                    alt={record.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-2 p-2">
                                <h3 className="font-medium">{record.title}</h3>
                                <p className="text-sm text-gray-600">{record.artist}</p>
                                <p className="mt-1 font-medium">{record.price * 1.25} kr</p>
                            </div>
                        </Link>
                    )) : []}
            </div>
        </>
    )
}