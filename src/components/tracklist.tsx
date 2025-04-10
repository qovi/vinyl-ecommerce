import { vinyls } from "@/server/db/schema";

interface TracklistProps {
    product: typeof vinyls.$inferSelect;
}

export default function Tracklist({ product }: TracklistProps) {
    return (
        <section className="px-4 py-2 border-b">
            <h2 className="text-lg font-medium">Sporliste</h2>
            <ul className="list-disc pl-5 space-y-1" role="list">
                {product.tracklist ? 
                    (() => {
                        try {
                            const tracklistData = product.tracklist || '[]';
                            const tracks = JSON.parse(tracklistData) as Array<{position: string, title: string}>;
                            
                            if (!Array.isArray(tracks) || tracks.length === 0) {
                                return <li>Ingen spor tilgængelige</li>;
                            }
                            
                            const groupedTracks = tracks.reduce((acc: Record<string, string[]>, track: {position: string, title: string}) => {
                                const position = track.position || 'Ukendt position';
                                const title = track.title || 'Ukendt titel';
                                
                                if (!acc[position]) {
                                    acc[position] = [];
                                }
                                acc[position].push(title);
                                return acc;
                            }, {} as Record<string, string[]>);

                            return Object.entries(groupedTracks).map(([position, titles]: [string, string[]]) => (
                                <li key={position}>
                                    {position}: {titles.length === 1 ? 
                                        titles[0] : 
                                        <ol className="pl-5 pt-1">
                                            {titles.map((title: string, idx: number) => (
                                                <li key={idx} className="list-decimal">{title}</li>
                                            ))}
                                        </ol>
                                    }
                                </li>
                            ));
                        } catch (error) {
                            return <li>Ugyldig sporliste format</li>;
                        }
                    })() : <li>Ingen sporliste tilgængelig</li>
                }
            </ul>
        </section>
    );
}
