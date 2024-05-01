import { useCookies } from '@vueuse/integrations/useCookies'

interface Session {
    refreshToken: string
    accessToken: string
    fullName: string
    roles: string
    permissions: string
    userId: string
}

const cookies = useCookies()
const userSession: Session = cookies.get('session')

export function setFullName(fullName: string) {
    userSession.fullName = fullName
    cookies.set('session', userSession)
}

export default userSession
