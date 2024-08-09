import { xCodeStreamApi } from '@/lib/xcode-stream-api'
import StreamList from '@/components/stream-list'

export default async function Movies({ searchParams }: any) { 
    const streams = (await xCodeStreamApi.getVodStreams(searchParams.category))
    
    return <StreamList title='Movies' streams={streams} />
}