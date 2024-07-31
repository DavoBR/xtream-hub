import { Season, SerieInfo, xCodeStreamApi } from '@/lib/xcode-stream-api'
import Link from 'next/link'
import { useCallback } from 'react'

export default async function Series({ params }: any) { 
    const serie = await xCodeStreamApi.getSerieInfo(params.id)
    const seasons = serie.seasons.filter(season => serie.episodes[season.season_number.toString()]?.length > 0)

    return (
        <main>
            <h1>Serie - {serie.info.name}</h1>
            <hr />
            <ul>
                {seasons.map((season) => (
                    <li key={season.id}>
                        <h2>{season.name} <PlaylistsLink serieId={params.id} serie={serie} season={season} /></h2>
                        
                        <ol>
                            {serie.episodes[season.season_number.toString()].map((episode) => (
                                <li key={episode.id}>
                                    <Link href={`/stream/series/${episode.id}`}>{episode.title}</Link>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ul>
        </main>
    )
}

function PlaylistsLink({ serieId, serie, season }: { serieId: string, serie: SerieInfo, season: Season }) { 
    const formats = ['m3u8', 'xspf']
    return (
        <>
        {formats.map(format => (
            <>
                {'['}
                <Link key={format} href={`/playlist/series/${serieId}/${season.season_number}.${format}`}>{format}</Link>
                {']'}
            </>
        ))}
        </>
    )
}