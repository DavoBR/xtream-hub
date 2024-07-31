import { type NextRequest } from 'next/server'
import { getQueryParamAsNumber } from '@/lib/utils'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export async function GET(request: NextRequest) { 
    const { protocol, host, searchParams } = request.nextUrl
    const category = getQueryParamAsNumber(searchParams, 'category')
    const streams = await xCodeStreamApi.getLiveStreams(category)
    const baseUrl = `${protocol}//${host}`
    const m3u = [
        '#EXTM3U',
        '#PLAYLIST: Movies',
        ...streams.map(stream => [`#EXTINF:0,${stream.name}`, `${baseUrl}/stream/movie/${stream.stream_id}`]).flat(),
        '#EXT-X-ENDLIST'
    ]
	return new Response(m3u.join('\n'), {
		headers: { 
            'Content-Type': 'application/x-mpegurl' 
        }
	})
}