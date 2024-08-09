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

export function findFirstLetter(word: string) : string | null {
    // Regular expression to match any letter from A to Z, case insensitive
    const regex = /[a-zA-Z]/;
    
    // Use the match method to find the first letter
    const match = word.match(regex);
    
    // If a match is found, return it; otherwise, return null
    return match ? match[0] : null;
}