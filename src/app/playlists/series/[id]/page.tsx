import { Season, SerieInfo, xCodeStreamApi } from '@/lib/xcode-stream-api'
import { Divider } from '@nextui-org/react'
import { Link } from "@nextui-org/link"

export default async function Series({ params }: any) { 
    const serie = await xCodeStreamApi.getSerieInfo(params.id)
    const seasons = serie.seasons.filter(season => serie.episodes[season.season_number.toString()]?.length > 0)

    return (
        <main className="m-4">
            <div className="flex gap-2">
                <Link href="/playlists/series" className="text-4xl text-orange-500">&#x2039;</Link>
                <h1 className="text-4xl my-4">
                  Serie - {serie.info.name}
                </h1>
            </div>
            <Divider className="my-4" />
            <div>
                {seasons.map((season) => (
                    <details key={season.id}>
                        <summary>
                          {season.name}&nbsp;
                          <PlaylistsLink serieId={params.id} serie={serie} season={season} />
                        </summary>                      
                        <ol className="ml-8">
                            {serie.episodes[season.season_number.toString()].map((episode) => (
                                <li key={episode.id}>
                                    <Link href={`/stream/series/${episode.id}`}>{episode.title}</Link>
                                </li>
                            ))}
                        </ol>
                    </details>
                ))}
            </div>
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
                <Link key={format} href={`/playlists/series/${serieId}/${season.season_number}.${format}`}>{format}</Link>
                {']'}
            </>
        ))}
        </>
    )
}