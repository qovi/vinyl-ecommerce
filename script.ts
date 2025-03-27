import { db } from "@/server/db"
import { record } from "@/server/db/schema"

const url = `https://api.discogs.com/releases/783439?token=${process.env.DISCOGS_TOKEN}`

const response = await fetch(url)
const data = await response.json()

type retrievedData = {
    id: number,
    cover: {
        uri: string
    },
    title: string,
    artist: string,
    year: number,
    price: number,
}

const retrievedData: retrievedData = {
    id: data.id,
    cover: {
        uri: data.images[0].uri
    },
    title: data.title,
    artist: data.artists[0].name,
    year: data.year,
    price: data.price || 0,
}

await db.insert(record).values({
    id: retrievedData.id,
    cover: retrievedData.cover.uri,
    title: retrievedData.title,
    artist: retrievedData.artist,
    year: retrievedData.year,
    price: retrievedData.price,
})