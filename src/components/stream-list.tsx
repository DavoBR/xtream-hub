import Link from 'next/link'
import { findFirstLetter } from '@/lib/utils'
import { VodStream, Serie, LiveStream } from '@/lib/xcode-stream-api'

type Props = { 
    title: string
    streams: (VodStream|Serie|LiveStream)[] 
}

export default function StreamList({ title, streams }: Props) { 
    const groups = Object.groupBy(streams, ({ name }) => {
        const letter = name ? findFirstLetter(name)?.toUpperCase() : null
        return letter && letter.match(/[A-Z]/) ? letter : '#'
    })
    const letters = Object.keys(groups).sort((a, b) => a.localeCompare(b))

    return (
        <main>
            <h1>{title}</h1>
            {letters.map((letter, index) => (
                <span key={letter}>
                    <span>{index > 0 && (<>&nbsp;&nbsp;|&nbsp;&nbsp;</>)}</span>
                    <Link href={`#${letter}`}>{letter}</Link>
                </span>
            ))}
            <hr />
            {letters.map(letter => (  
                <div key={letter} id={letter}>
                    <h2>{letter}</h2>
                    <ul>
                        {groups[letter]!.map((stream: any) => (
                            <li key={getStreamId(stream)}>
                                <Link href={getStreamUrl(stream)}>{stream.name ?? '<Unknown>'}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </main>
    )
}

function getStreamId(stream: { stream_type: string, series_id?: number, stream_id?: number }) {
    if (stream.stream_type === 'serie') {
        return stream.series_id
    } else {
        return stream.stream_id
    }

}

function getStreamUrl(stream: { stream_type: string, series_id?: number, stream_id?: number }) {
    switch (stream.stream_type) {
        case 'series':
            return `/playlists/series/${stream.series_id}`
        case 'live':
            return `/stream/live/${stream.stream_id}`
        case 'movie':
            return `/stream/movie/${stream.stream_id}`
        default:
            return '#'
    }
}