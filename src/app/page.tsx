import { Divider } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { Fragment } from "react";

export default function Home() {
    return (
        <main className="m-32 text-center">
            <h1 className="text-4xl text-bold">Playlists</h1>
            <Divider className="my-4" />
            <div className="flex justify-items-center justify-evenly">
                <div>
                    <Link href="/playlists/movies">Movies</Link>
                    <PlaylistsLink type="movies" />
                </div>
                <div>
                    <Link href="/playlists/series">Series</Link>
                    <PlaylistsLink type="series" />
                </div>
                <div>
                    <Link href="/playlists/live">Live TV</Link>
                    <PlaylistsLink type="live" />
                </div>
            </div>
        </main>
    );
}

function PlaylistsLink({ type }: { type: string }) {
    const formats = ['m3u8', 'xspf']
    return (
        <div className="flex gap-4">
            {formats.map((format, index) => (
                <Fragment key={format}>
                    {index > 0 && <Divider orientation="vertical" />}
                    <Link className="text-orange-500" href={`/playlists/${type}.${format}`}>{format}</Link>
                </Fragment>
            ))}
        </div>
    )
}