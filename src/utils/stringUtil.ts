export function join(data: []): string {
    if (data === undefined) {
        return ''
    }
    if (data.length === 0) {
        return ''
    }

    return data.join(', ')
}
