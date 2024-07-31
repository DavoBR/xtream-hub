import Link from 'next/link'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export default async function Series({ searchParams }: any) { 
    const series = await xCodeStreamApi.getSeries(searchParams.category)

    series.sort((a, b) => a.name?.localeCompare(b.name))
    
    return (
        <main>
            <h1>Series</h1>
            <hr />
            <ol>
                {series.map(serie => (
                    <li key={serie.num}>
                        <Link href={`/playlists/series/${serie.series_id}`}>{serie.name ?? '<Unknown>'}</Link>
                    </li>
                ))}
            </ol>
        </main>
    )
}