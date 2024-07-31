import Link from 'next/link'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export default async function Movies({ searchParams }: any) { 
    const streams = await xCodeStreamApi.getVodStreams(searchParams.category)
    
    return (
        <main>
            <h1>Movies</h1>
            <hr />
            <ol>
                {streams.map(stream => (
                    <li key={stream.stream_id}>
                        <Link href={`/stream/movie/${stream.stream_id}`}>{stream.name}</Link>
                    </li>
                ))}
            </ol>
        </main>
    )
}