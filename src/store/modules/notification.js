import axios from '../../services/axios'

const NOTIFICATION_ENDPOINT = '/notifications'
const MESSAGE_ENDPOINT = '/messages'
export default {
  state: {
    directMessages: [],
    unreadMessageCount: 0
  },
  mutations: {
    SET_DIRECT_MESSAGES(state, payload) {
      state.directMessages = payload
    },
    SET_UNREAD_MESSAGE_COUNT(state, payload) {
      state.unreadMessageCount = payload
    }
  },
  actions: {
    getNotifications({state, commit, rootState}, payload) {
      return axios
        .get(`${NOTIFICATION_ENDPOINT}`)
        .then(response => {
          return response.data
        })
        .catch(err => err)
    },
    readAllNotification({state, commit, rootState}, payload) {
      return axios
        .get(`${NOTIFICATION_ENDPOINT}/read_all`)
        .then(response => {
          if (response) {
            return response.data
          }
          return response
        })
        .catch(err => err)
    },
    getNotificationMessages({state, commit, rootState}, payload) {
      return axios
        .get(`${MESSAGE_ENDPOINT}`)
        .then(response => {
          if (response) {
            // return response.data
            const res = response.data
            const recipients = res.recipients
            const chats = res.chats
            let unreadMessage = 0
            const listMessages = recipients.map(item => {
              const name = item.first_name ? `${item.first_name} ${item.last_name}` :  item.business_name
              const chatItem = chats[item.id]
              unreadMessage += (chatItem['unread'] || 0)
              return {
                id: item.id,
                photo: item.photo,
                first_name: item.first_name || item.contact_first_name || '',
                last_name: item.last_name || item.contact_last_name || '',
                name: name,
                created_at: chatItem && chatItem['created_at'],
                message: chatItem && chatItem['last'],
                type: 'message',
                newMessage: chatItem['unread'] || 0
              }
            })
            commit('SET_DIRECT_MESSAGES', listMessages)
            commit('SET_UNREAD_MESSAGE_COUNT', unreadMessage)
          }
          return response
        })
        .catch(err => err)
    },
  },
  getters: {
    directMessages: state => state.directMessages,
    unreadMessageCount: state => state.unreadMessageCount
  },
} 
