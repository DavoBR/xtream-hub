import { Link } from "@nextui-org/link";
import { findFirstLetter } from '@/lib/utils'
import { VodStream, Serie, LiveStream } from '@/lib/xcode-stream-api'
import { Divider } from '@nextui-org/react'
import { Fragment } from 'react'

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
        <main className="m-4">
            <div className="flex gap-2">
                <Link href="/" className="text-4xl text-orange-500">&#x2039;</Link>
                <h1 className="text-4xl my-4">{title}</h1>
            </div>
            <div className="flex h-5 items-center space-x-4 text-small">
                {letters.map((letter, index) => (
                    <Fragment key={letter}>
                        {index > 0 && <Divider orientation="vertical" />}
                        <Link href={`#${letter}`}>{letter}</Link>
                    </Fragment>
                ))}
            </div>
            <Divider className="my-4" />
            {letters.map(letter => (  
                <div key={letter} id={letter}>
                    <h2 className="font-bold">{letter}</h2>
                    <ul className="list-decimal ml-12">
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