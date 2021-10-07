import axios from '../../services/axios'

import { AccountInfoBusiness, AccountInfoSpecialist } from "../../models/AccountInfo";

const currentUserLocalStorage = localStorage.getItem('app.currentUser') ? localStorage.getItem('app.currentUser') : ''
const accessTokenLocalStorage = localStorage.getItem('app.currentUser.token') ? localStorage.getItem('app.currentUser.token') : ''
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY

export default {
  state: {
    currentUser: currentUserLocalStorage ? JSON.parse(currentUserLocalStorage) : {},
    accessToken: accessTokenLocalStorage ? JSON.parse(accessTokenLocalStorage) : '',
    loggedIn: false,
    staticCollection: {
      GOOGLE_PLACES_API_KEY: '',
      PLAID_PUBLIC_KEY: '',
      STRIPE_PUBLISHABLE_KEY: '',
      countries: [],
      industries: [],
      jurisdictions: [],
      states: [],
      sub_industries_business: [],
      sub_industries_specialist: [],
      timezones: [],
    },
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.currentUser = payload;
    },
    UPDATE_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    UPDATE_LOGIN_STATUS(state, payload) {
      state.loggedIn = payload
    },
    SET_STATIC_COLLECTION (state, payload) {
      const timezones = payload.timezones.map(tz => {
          const [ zone, city ] = tz
          return {
            value: city,
            name: zone
          }
        }
      )
      state.staticCollection = {
        ...payload,
        timezones
      }
    },
  },
  actions: {
    async signIn({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const response = await axios.post(`/users/sign_in`, payload)
        if (typeof response.data === 'string') return { errors: { onboarding: 'not-passed' } } // HOOK to catch users not passed onboarding
        if (response.data) {
          if(response.data.token) {
            commit('UPDATE_TOKEN', response.data.token)
            localStorage.setItem('app.currentUser.token', JSON.stringify(response.data.token));
            commit('UPDATE_LOGIN_STATUS', true)
          }
          if(response.data.business) {
            const data = response.data.business
            commit('UPDATE_USER', new AccountInfoBusiness(
              data.apartment,
              data.aum,
              data.business_name,
              data.city,
              data.client_account_cnt,
              data.contact_first_name,
              data.contact_last_name,
              data.crd_number,
              data.id,
              data.industries,
              data.jurisdictions,
              data.state,
              data.sub_industries,
              data.username,
              data.address_1,
              data.address_2,
              data.contact_phone,
              data.website,
              data.zipcode
            ))
            localStorage.setItem('app.currentUser', JSON.stringify(data));
            localStorage.setItem('app.currentUser.userType', JSON.stringify('business'));
          }
          if(response.data.specialist) {
            const data = response.data.specialist
            commit('UPDATE_USER', new AccountInfoSpecialist(
              data.experience,
              data.first_name,
              data.former_regulator,
              data.id,
              data.industries,
              data.last_name,
              data.resume_url,
              data.skills,
              data.username
            ))
            localStorage.setItem('app.currentUser', JSON.stringify(data));
            localStorage.setItem('app.currentUser.userType', JSON.stringify('specialist'));
          }
        }
        return response.data

      } catch (error) {
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async signUp({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        let endPoint = payload.business ? 'businesses' : 'specialists'
        endPoint = payload.seat_id ? `business/seats/${payload.seat_id}/assign` : endPoint
        const response = await axios.post(`/${endPoint}`, payload)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async signOut({commit}) {
      console.log('signOut test')

      try {
        commit("clearError");
        commit("setLoading", true);

        // const endPoint = payload.business ? 'businesses' : 'specialists'
        // const response = await axios.delete(`/${endPoint}`, payload)
        const response = await axios.delete(`/users/sign_out`)
        console.log('response in auth', response)
        if(response.data) {
          localStorage.removeItem('app.currentUser');
          localStorage.removeItem('app.currentUser.token');
        }
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async confirmEmail({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        // const response = await axios.put(`/users/${payload.userId}/confirm_email`, { "otp_secret": payload.code })
        const response = await axios.put(`/users/confirm_email`, payload)

        if (response.data) {
          if(response.data.token) {
            commit('UPDATE_TOKEN', response.data.token)
            localStorage.setItem('app.currentUser.token', JSON.stringify(response.data.token));
            commit('UPDATE_LOGIN_STATUS', true)
          }
          if(response.data.business) {
            const data = response.data.business
            commit('UPDATE_USER', new AccountInfoBusiness(
              data.apartment,
              data.aum,
              data.business_name,
              data.city,
              data.client_account_cnt,
              data.contact_first_name,
              data.contact_last_name,
              data.crd_number,
              data.id,
              data.industries,
              data.jurisdictions,
              data.state,
              data.sub_industries,
              data.username,
              data.address_1,
              data.address_2,
              data.contact_phone,
              data.website,
              data.zipcode
            ))
            localStorage.setItem('app.currentUser', JSON.stringify(data));
          }
          if(response.data.specialist) {
            const data = response.data.specialist
            commit('UPDATE_USER', new AccountInfoSpecialist(
              data.experience,
              data.first_name,
              data.former_regulator,
              data.id,
              data.industries,
              data.last_name,
              data.resume_url,
              data.skills,
              data.username
            ))
            localStorage.setItem('app.currentUser', JSON.stringify(data));
          }
        }
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async resetEmail({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const response = await axios.post(`/users/password`, payload)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async changeEmail({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const response = await axios.put(`/users/password`, payload)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async getInfoByCRDNumber({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        // const response = await axios.patch(`/business`, payload)
        const response = await axios.patch(`/businesses/auto_populate`, payload)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async updateAccountInfo({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const endPointUserType = payload.business ? 'business' : 'specialist'
        const config = {
          headers: {
            'Content-Type': endPointUserType === 'specialist' ? 'multipart/form-data' : 'application/json',
          }
        };
        const data = { [endPointUserType]: payload[endPointUserType] };
        const response = await axios.patch(`/${endPointUserType}`, payload)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        if(response.data) {
          const data = response.data
          if (payload.business) commit('UPDATE_USER', new AccountInfoBusiness(
            data.apartment,
            data.aum,
            data.business_name,
            data.city,
            data.client_account_cnt,
            data.contact_first_name,
            data.contact_last_name,
            data.crd_number,
            data.id,
            data.industries,
            data.jurisdictions,
            data.state,
            data.sub_industries,
            data.username,
            data.address_1,
            data.address_2,
            data.contact_phone,
            data.website,
            data.zipcode
          ))
          if (!payload.business) commit('UPDATE_USER', new AccountInfoSpecialist(
            data.experience,
            data.first_name,
            data.former_regulator,
            data.id,
            data.industries,
            data.last_name,
            data.resume_url,
            data.skills,
            data.username
          ))
          if(!data.errors) localStorage.setItem('app.currentUser', JSON.stringify(data));
        }
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async updateAccountInfoWithFile({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        const endPointUserType = payload.business ? 'business' : 'specialist'
        const data = payload.business ? payload.business : payload
        const response = await axios.patch(`${endPointUserType}`, data, config)
        if(response.data) {
          const data = response.data
          if (payload.business) commit('UPDATE_USER', new AccountInfoBusiness(
            data.apartment,
            data.aum,
            data.business_name,
            data.city,
            data.client_account_cnt,
            data.contact_first_name,
            data.contact_last_name,
            data.crd_number,
            data.id,
            data.industries,
            data.jurisdictions,
            data.state,
            data.sub_industries,
            data.username,
            data.address_1,
            data.address_2,
            data.contact_phone,
            data.website,
            data.zipcode,
            data.photo
          ))
          if (!payload.business) commit('UPDATE_USER', new AccountInfoSpecialist(
            data.experience,
            data.first_name,
            data.former_regulator,
            data.id,
            data.industries,
            data.last_name,
            data.resume_url,
            data.skills,
            data.username,
            data.photo_url
          ))
          if(!data.errors) localStorage.setItem('app.currentUser', JSON.stringify(data));
        }
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async updateSubscribe({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const { userType, paymentSourceId, planName, additionalUsers, coupon_id } = { ...payload }

        const endPoint = userType === 'business' ? 'business' : 'specialist'
        // WAIT LONGER
        axios.defaults.timeout = 10000;
        const response = await axios.post(`/${endPoint}/upgrade/subscribe`, {
          plan: planName,
          payment_source_id: paymentSourceId,
          seats_count: additionalUsers,
          coupon_id: coupon_id
        })
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async updateSeatsSubscribe({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const { userType, paymentSourceId, planName, countPayedUsers } = { ...payload }
        const endPoint = userType === 'business' ? 'business' : 'specialist'

        // WAIT LONGER
        axios.defaults.timeout = 60000;
        // const response = await axios.post(`/${endPoint}/upgrade/subscribe`, { plan: planName, cnt: countPayedUsers }, { params: { payment_source_id: paymentSourceId }})
        const response = await axios.post(`/${endPoint}/upgrade/subscribe`, { plan: planName, seats_count: countPayedUsers })
        return response.data

        // let ids = [];
        // for(let i=1; i <= countPayedUsers; i++) {
        //   ids.push(i)
        // }
        // const promises = ids.map(() => axios.post(`/${endPoint}/upgrade/subscribe`, { plan: planName }, { params: {
        //     payment_source_id: paymentSourceId
        //   }}));
        //
        // const response = await Promise.all([...promises]).then(function (values) {
        //   // console.log(values);
        //   return values
        // });
        // return response

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async generatePaymentMethod({commit, getters}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        // WAIT LONGER
        axios.defaults.timeout = 10000;

        const { userType, stripeToken, plaid } = { ...payload }

        const endPoint = userType === 'business' ? 'business/payment_settings' : 'specialist/payment_settings/create_card'
        // const response = await axios.post(`/${endPoint}/payment_settings?stripeToken=${payload.stripeToken}`)
        let response
        if (stripeToken) response = await axios.post(`/${endPoint}`, null, { params: {
            stripeToken: stripeToken,
          }})
        if (plaid) response = await axios.post(`/${endPoint}`, plaid)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async getPaymentMethod({commit, getters}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const { userType } = {...payload}
        const response = await axios.get(`/${userType}/payment_settings`)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async deletePaymentMethod({commit, getters}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const { userType, id } = {...payload}
        const response = await axios.delete(`/${userType}/payment_settings/${id}`)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async getSkills({commit}, payload) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const response = await axios.get(`/skills`)
        // if (!response.ok) throw new Error(`Something wrong, (${response.status})`)
        return response.data

      } catch (error) {
        console.error(error);
        throw error
      } finally {
        commit("setLoading", false)
      }
    },
    async getGeo({commit}, payload) {
      try {
        const response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${payload}&key=${GOOGLE_API_KEY}`)
        return response
      } catch (error) {
        console.error(error);
        throw error
      } finally {
      }
    },
    async resendOTP({commit}, payload) {
      try {
        const response = await axios.post(`/otp_secrets`, payload)
        return response.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    async getStaticCollection({commit}) {
      try {
        commit("clearError");
        commit("setLoading", true);

        const response = await axios.get(`/static_collection`)
        if (response.data) commit('SET_STATIC_COLLECTION', response.data)
        return response.data

      } catch (error) {
        console.error(error);
        return error
      } finally {
        commit("setLoading", false)
      }
    },
    async applyCoupon({commit}, payload) {
      try {
        // commit("clearError");
        // commit("setLoading", true);

        const response = await axios.post(`/payment_settings/apply_coupon`, payload)
        return response.data

      } catch (error) {
        throw error
      } finally {
        // commit("setLoading", false)
      }
    },
  },
  getters: {
    getUser(state) {
      return state.currentUser;
    },
    loggedIn(state) {
      return state.loggedIn
    },
    accessToken(state) {
      return state.accessToken
    },
    staticCollection(state) {
      return state.staticCollection
    },
  },
};
