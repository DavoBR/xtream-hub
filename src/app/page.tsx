import Link from "next/link"

export default function Home() {
    return (
        <main>
            <h1>Playlists</h1>
            <hr />
            <ol>
                <li>
                    <Link href="/playlists/movies">Movies</Link>&nbsp;
                    <PlaylistsLink type="movies" />
                </li>
                <li>
                    <Link href="/playlists/series">Series</Link>&nbsp;
                    <PlaylistsLink type="series" />
                </li>
                <li>
                    <Link href="/playlists/live">Live TV</Link>&nbsp;
                    <PlaylistsLink type="live" />
                </li>
            </ol>
        </main>
    );
}

function PlaylistsLink({ type }: { type: string }) {
    const formats = ['m3u8', 'xspf']
    return (
        <>
            {formats.map(format => (
                <>
                    {'['}
                    <Link key={format} href={`/playlists/${type}.${format}`}>{format}</Link>
                    {']'}
                </>
            ))}
        </>
    )
}