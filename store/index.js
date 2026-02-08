import {
	createPinia
} from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import {
	useUserStore
} from './modules/user.js'
import {
	useAppStore
} from './modules/app.js'
const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia

export {
	useUserStore,
	useAppStore
}