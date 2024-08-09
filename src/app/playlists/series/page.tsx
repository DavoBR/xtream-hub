import { xCodeStreamApi } from '@/lib/xcode-stream-api'
import StreamList from '@/components/stream-list'

export default async function Series({ searchParams }: any) { 
    const series = await xCodeStreamApi.getSeries(searchParams.category)
    
    return <StreamList title='Series' streams={series} />
}