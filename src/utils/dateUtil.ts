import moment from 'moment'

export function format(date: Date): string {
    if (date == undefined) {
        return date
    }
    return moment().format('MMMM Do YYYY, h:mm:ss a')
}
