export default {
    setItem(key, value, ttl = null) {
        const item = { value }

        if (ttl) {
            item._expiry = Date.now() + ttl
        }

        localStorage.setItem(key, JSON.stringify(item))
    },

    getItem(key) {
        const item = JSON.parse(localStorage.getItem(key))

        if (!item) {
            return null
        }

        if (item._expiry && item._expiry < Date.now()) {
            localStorage.removeItem(key)
            return null
        }

        return item.value
    },
}
