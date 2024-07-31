import { type NextRequest } from 'next/server'
import * as xmlbuilder from 'xmlbuilder2'
import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export async function GET(request: NextRequest, { params }: any ) { 
    console.log({ params })
    const { protocol, host } = request.nextUrl
    const serie = await xCodeStreamApi.getSerieInfo(params.id)
    
    const baseUrl = `${protocol}//${host}`
    const episodes = serie.episodes['2']    

    const xspf = xmlbuilder.create({ encoding: 'UTF-8' })
        .ele('http://xspf.org/ns/0/', 'playlist', { version: '1' })
            .ele('title').txt('DBR Movies').up()
            .ele('creator').txt('DBR').up()
            .ele('info').txt('https://streams.vercel.app').up()
        
    const trackListEle = xspf.ele('trackList')
    
    for (const episode of episodes) {
        trackListEle.ele('track')
            .ele('title').txt(episode.title).up()
            .ele('location').txt(`${baseUrl}/stream/series/${episode.id}`).up()
        .up() 
    }

    const xml = xspf.end({ prettyPrint: true })
    
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xspf+xml' }
	})
}