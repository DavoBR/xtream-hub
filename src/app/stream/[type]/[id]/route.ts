import { xCodeStreamApi } from '@/lib/xcode-stream-api'

export async function GET(request: Request, { params }: any ) { 
    const { type, id } = params

    console.log(`Querying stream url for ${type}/${id}`)

    const url = await xCodeStreamApi.getStreamUrl(type, id)
	
    if (!url) return new Response('Not Found', { status: 404 })

    console.log(`Url for stream ${type}/${id}: ${url}`)

	return Response.redirect(url)
}