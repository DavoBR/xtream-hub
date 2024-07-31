import { type NextRequest } from 'next/server'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export async function GET(request: NextRequest, { params }: any ) { 
    const { protocol, host, searchParams } = request.nextUrl
    const serie = await xCodeStreamApi.getSerieInfo(params.id)
    
    const baseUrl = `${protocol}//${host}`
    const episodes = serie.episodes[params.season.split('.')[0]]
    
    const m3u = [
        '#EXTM3U',
        '#PLAYLIST: Movies',
        ...episodes.map(episode => [`#EXTINF:0,${episode.title}`, `${baseUrl}/stream/series/${episode.id}`]).flat(),
        '#EXT-X-ENDLIST'
    ]

	return new Response(m3u.join('\n'), {
		headers: { 
            'Content-Type': 'application/x-mpegurl' 
        }
	})
}