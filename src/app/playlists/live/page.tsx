import Link from 'next/link'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export default async function Live({ searchParams }: any) { 
    const streams = await xCodeStreamApi.getLiveStreams(searchParams.category)
    
    return (
        <main>
            <h1>Live TV</h1>
            <hr />
            <ol>
                {streams.map(stream => (
                    <li key={stream.stream_id}>
                        <Link href={`/stream/live/${stream.stream_id}`}>{stream.name ?? '<Unknown>'}</Link>
                    </li>
                ))}
            </ol>
        </main>
    )
}