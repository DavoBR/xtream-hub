export type StreamType = 'movie' | 'series' | 'live'

export interface VodStream {
    num: number
    name: string
    title: string
    year: string
    stream_type: string
    stream_id: number
    stream_icon: string
    rating: number
    rating_5based: number
    added: string
    plot: string
    cast: string
    director: string
    genre: string
    release_date: string
    youtube_trailer: string
    episode_run_time: string
    category_id: string
    category_ids: number[]
    container_extension: string
    custom_sid: string
    direct_source: string
}

export interface VodInfo {
    info: VodInfoInfo
    movie_data: MovieData
}

export interface VodInfoInfo {
    kinopoisk_url: string
    tmdb_id: number
    name: string
    o_name: string
    cover_big: string
    movie_image: string
    release_date: string
    episode_run_time: number
    youtube_trailer: string
    director: string
    actors: string
    cast: string
    description: string
    plot: string
    age: string
    mpaa_rating: string
    rating_count_kinopoisk: number
    country: string
    genre: string
    backdrop_path: string[]
    duration_secs: number
    duration: string
    bitrate: number
    rating: number
    releasedate: string
    subtitles: any[]
}

export interface MovieData {
    stream_id: number
    name: string
    title: string
    year: string
    added: string
    category_id: string
    category_ids: number[]
    container_extension: string
    custom_sid: string
    direct_source: string
}

export interface Serie {
    num: number
    name: string
    title: string
    year: string
    stream_type: string
    series_id: number
    cover: string
    plot: string
    cast: string
    director: any
    genre: string
    release_date: string
    releaseDate: string
    last_modified: string
    rating: string
    rating_5based: number
    backdrop_path: string[]
    youtube_trailer: any
    episode_run_time: string
    category_id: string
    category_ids: number[]
}
  
export interface SerieInfo {
    seasons: Season[]
    info: SerieInfoInfo
    episodes: { [key: string]: Episode[] }
}
  
export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    season_number: number
    vote_average: number
    cover: string
    cover_big: string
}
  
export interface SerieInfoInfo {
    name: string
    title: string
    year: string
    cover: string
    plot: string
    cast: string
    director: string
    genre: string
    release_date: string
    releaseDate: string
    last_modified: string
    rating: string
    rating_5based: number
    backdrop_path: string[]
    youtube_trailer: string
    episode_run_time: string
    category_id: string
    category_ids: number[]
}
  
export interface Episode {
    id: string
    episode_num: string
    title: string
    container_extension: string
    info: EpisodeInfo
    subtitles: any[]
    custom_sid: string
    added: string
    season: number
    direct_source: string
}
  
export interface EpisodeInfo {
    release_date: string
    plot: string
    duration_secs: number
    duration: string
    movie_image: string
    bitrate: number
    rating: string
    season: string
    tmdb_id: string
    cover_big: string
}
  
export interface LiveStream {
    num: number
    name: string
    stream_type: string
    stream_id: number
    stream_icon: string
    epg_channel_id: string
    added: string
    custom_sid: string
    tv_archive: number
    direct_source: string
    tv_archive_duration: number
    category_id: string
    category_ids: number[]
    thumbnail: string
}

export interface Category {
    category_id: string
    category_name: string
    parent_id: number
}
  
export class XCodeStreamApi {
    server: string
    username: string
    password: string

    constructor(server: string, username: string, password: string) {
        this.server = server
        this.username = username
        this.password = password
    }

    get playerApiUrl() {
        return `${this.server}/player_api.php?username=${this.username}&password=${this.password}`
    }

    async getVodStreams(categoryId: number | undefined = undefined): Promise<VodStream[]> {
        const queryParams = ['action=get_vod_streams', categoryId ? `category_id=${categoryId}` : '']
        const response = await fetch(`${this.playerApiUrl}&${queryParams.join('&')}`)
        return await response.json()
    }

    async getVodInfo(id: string): Promise<VodInfo> {
        const response = await fetch(`${this.playerApiUrl}&action=get_vod_info&vod_id=${id}`)
        return await response.json()
    }

    async getSeries(categoryId: number | undefined = undefined) : Promise<Serie[]> {
        const queryParams = ['action=get_series', categoryId ? `category_id=${categoryId}` : '']
        const response = await fetch(`${this.playerApiUrl}&${queryParams.join('&')}`)
        return await response.json()
    }

    async getSerieInfo(id: string) : Promise<SerieInfo> {
        const response = await fetch(`${this.playerApiUrl}&action=get_series_info&series_id=${id}`)
        return await response.json()
    }

    async getLiveStreams(categoryId: number | undefined = undefined) : Promise<LiveStream[]> {
        const queryParams = ['action=get_live_streams', categoryId ? `category_id=${categoryId}` : '']
        const response = await fetch(`${this.playerApiUrl}&${queryParams.join('&')}`)
        return await response.json()
    }

    async getStreamUrl(type: StreamType, id: string) : Promise<string | null> {
        const extension = type === 'live' ? 'm3u8' : 'mp4';
        const url = `${this.server}/${type}/${this.username}/${this.password}/${id}.${extension}`;
        const response = await fetch(url, { redirect: 'manual', cache: 'no-store' });
        return response.headers.get('location');
    }

    async getCategories(type: StreamType) : Promise<Category[]> {
        const response = await fetch(`${this.playerApiUrl}&action=get_${type}_categories`)
        return await response.json()
    }
}

export const xCodeStreamApi = new XCodeStreamApi(process.env.SERVER!, process.env.USERNAME!, process.env.PASSWORD!)