import { xCodeStreamApi } from '@/lib/xcode-stream-api'
import StreamList from '@/components/stream-list'

export default async function Live({ searchParams }: any) { 
    const streams = await xCodeStreamApi.getLiveStreams(searchParams.category)
    
    return <StreamList title='Live TV' streams={streams} />
}