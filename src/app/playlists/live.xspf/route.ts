import { type NextRequest } from 'next/server'
import * as xmlbuilder from 'xmlbuilder2'
import { getQueryParamAsNumber } from '@/lib/utils'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export async function GET(request: NextRequest) { 
    const { protocol, host, searchParams } = request.nextUrl
    const category = getQueryParamAsNumber(searchParams, 'category')
    const streams = await xCodeStreamApi.getVodStreams(category)

    const baseUrl = `${protocol}//${host}`

    const xspf = xmlbuilder.create({ encoding: 'UTF-8' })
        .ele('http://xspf.org/ns/0/', 'playlist', { version: '1' })
            .ele('title').txt('DBR Movies').up()
            .ele('creator').txt('DBR').up()
            .ele('info').txt('https://streams.vercel.app').up()
        
    const trackListEle = xspf.ele('trackList')
    
    for (const stream of streams) {
        trackListEle.ele('track')
            .ele('title').txt(stream.name).up()
            .ele('location').txt(`${baseUrl}/stream/live/${stream.stream_id}`).up()
        .up() 
    }

    const xml = xspf.end({ prettyPrint: true })
    
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xspf+xml' }
	})
}