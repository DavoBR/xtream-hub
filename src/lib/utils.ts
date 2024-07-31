export function getQueryParamAsNumber(searchParams: URLSearchParams, name: string) : number | undefined {
    const value = searchParams.get(name)
    if (!value) {
        return undefined
    }
    const number = parseInt(value)
    if (isNaN(number)) {
        return undefined
    }
    return number
}