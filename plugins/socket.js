// utils/socket.js  (uni-app + Vue2)

const SOCKET_URL = 'wss://ws-proxy-5c4b.onrender.com/ws/crypto/tickers'

let socketOpen = false
let socketTask = null
let reconnectTimer = null
let heartbeatTimer = null
let messageHandlers = []

const HEARTBEAT_INTERVAL = 15000   // 15s
const RECONNECT_DELAY = 3000       // 3s

function connectSocket() {
  if (socketTask) return

  socketTask = uni.connectSocket({
    url: SOCKET_URL,
    success() {
      console.log('[socket] connecting...')
    },
    fail(err) {
      console.log('[socket] connect fail', err)
    }
  })

  uni.onSocketOpen(() => {
    socketOpen = true
    console.log('[socket] open')

    startHeartbeat()
  })

  uni.onSocketMessage(res => {
    let data = res.data
    try {
      data = JSON.parse(res.data)
    } catch (e) {}

    messageHandlers.forEach(cb => cb(data))
  })

  uni.onSocketError(err => {
    console.log('[socket] error', err)
    reconnect()
  })

  uni.onSocketClose(() => {
    console.log('[socket] close')
    socketOpen = false
    socketTask = null
    stopHeartbeat()
    reconnect()
  })
}

function send(data) {
  if (!socketOpen) return

  const msg = typeof data === 'string'
    ? data
    : JSON.stringify(data)

  uni.sendSocketMessage({ data: msg })
}

function closeSocket() {
  stopHeartbeat()
  socketOpen = false
  socketTask = null
  uni.closeSocket()
}

function reconnect() {
  if (reconnectTimer) return

  reconnectTimer = setTimeout(() => {
    console.log('[socket] reconnecting...')
    connectSocket()
    reconnectTimer = null
  }, RECONNECT_DELAY)
}

function startHeartbeat() {
  stopHeartbeat()
  heartbeatTimer = setInterval(() => {
    if (socketOpen) {
      send({ type: 'ping' })
    }
  }, HEARTBEAT_INTERVAL)
}

function stopHeartbeat() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
  }
}

// 订阅消息
function onMessage(cb) {
  if (typeof cb === 'function') {
    messageHandlers.push(cb)
  }
}

export default {
  connectSocket,
  send,
  closeSocket,
  onMessage
}
