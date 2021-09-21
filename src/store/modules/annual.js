import axios from '../../services/axios'
import backendUrl from '@/services/axios/backendUrl'
import AnnualReview from "../../models/AnnualReview";

export default {
  state: {
    reviews: [],
    currentReview: null,
  },
  mutations: {
    SET_REVIEWS (state, payload) {
      state.reviews = payload
    },
    SET_CURRENT_REVIEW (state, payload) {
      state.currentReview = payload
    },
    SET_NEW_REVIEW (state, payload) {
      state.reviews.push(payload)
    },
    UPDATE_REVIEW (state, payload) {
      const index = state.reviews.findIndex(record => record.id === payload.id);
      state.reviews.splice(index, 1, payload)
    },
    DELETE_REVIEW (state, payload) {
      const index = state.reviews.findIndex(record => record.id === payload.id);
      state.reviews.splice(index, 1)
    },
  },
  actions: {
    async createReview({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(backendUrl + '/api/business/annual_reports', {
          method: 'POST',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Could't create review (${response.status})`);
        }
        const data = await response.json()
        if (data) commit('SET_NEW_REVIEW', new AnnualReview(
          data.annual_review_employees,
          data.business_id,
          data.created_at,
          data.exam_end,
          data.exam_start,
          data.id,
          data.material_business_changes,
          data.pdf_url,
          data.regulatory_changes,
          data.review_categories,
          data.review_end,
          data.review_start,
          data.updated_at,
          data.year,
          data.name,
          false
        ))
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async getReviews({ commit, rootGetters }) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(backendUrl + '/api/business/annual_reports', {
          method: 'GET',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          }
        })
        const data = await response.json()
        const reviews = []
        console.log(data);
        for (const annualItem of data) {
          reviews.push(new AnnualReview(
            annualItem.annual_review_employees,
            annualItem.business_id,
            annualItem.created_at,
            annualItem.exam_end,
            annualItem.exam_start,
            annualItem.id,
            annualItem.material_business_changes,
            annualItem.pdf_url,
            annualItem.regulatory_changes,
            annualItem.review_categories,
            annualItem.review_end,
            annualItem.review_start,
            annualItem.updated_at,
            annualItem.year,
            annualItem.name,
            annualItem.complete,
            annualItem.completed_at
          ))
        }
        commit('SET_REVIEWS', reviews)
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async getCurrentReview({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(`${backendUrl}/api/business/annual_reports/${payload}`, {
          method: 'GET',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          }
        })
        if (!response.ok) {
          throw new Error(`Could't create review (${response.status})`);
        }
        const data = await response.json()
        commit('SET_CURRENT_REVIEW', new AnnualReview(
          data.annual_review_employees,
          data.business_id,
          data.created_at,
          data.exam_end,
          data.exam_start,
          data.id,
          data.material_business_changes,
          data.pdf_url,
          data.regulatory_changes,
          data.review_categories,
          data.review_end,
          data.review_start,
          data.updated_at,
          data.year,
          data.name,
          data.complete
        ))
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async updateReview({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(`${backendUrl}/api/business/annual_reports/${payload.id}`, {
          method: 'PATCH',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Could't update review (${response.status})`);
        }
        const data = await response.json()
        if (data) commit('UPDATE_REVIEW', new AnnualReview(
          data.annual_review_employees,
          data.business_id,
          data.created_at,
          data.exam_end,
          data.exam_start,
          data.id,
          data.material_business_changes,
          data.pdf_url,
          data.regulatory_changes,
          data.review_categories,
          data.review_end,
          data.review_start,
          data.updated_at,
          data.year,
          data.name
        ))
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async duplicateReview({ commit }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await axios.get(`business/annual_reports/${payload.id}/clone`)
        if (response.data) commit('SET_NEW_REVIEW', new AnnualReview(
          response.data.annual_review_employees,
          response.data.business_id,
          response.data.created_at,
          response.data.exam_end,
          response.data.exam_start,
          response.data.id,
          response.data.material_business_changes,
          response.data.pdf_url,
          response.data.regulatory_changes,
          response.data.review_categories,
          response.data.review_end,
          response.data.review_start,
          response.data.updated_at,
          response.data.year,
          response.data.name
        ))
        return response.data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async deleteReview({ commit }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await axios.delete(`business/annual_reports/${payload.id}`)
        commit('DELETE_REVIEW', response.data )
        return response.data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async downloadReviewPdf({ commit, rootGetters }, payload) {
      try {
        const response = await axios.get(`business/annual_reports/${payload.id}/download`)
        if (response.data.status === 'ok') {
          let retry = 0
          const timeRequest = 5000 // 5 seconds
          const getPdfFile = setInterval(async () => {
            if (retry > 10) {
              clearInterval(getPdfFile)
              return
            }

            retry = retry + 1
            const res = await axios.get(`business/annual_reports/${payload.id}`)
            if (res.data && res.data.pdf_url) {
              clearInterval(getPdfFile)
              if (rootGetters.isDevEnv) {
                window.open(backendUrl + res.data.pdf_url, '_self')
              } else {
                window.open(res.data.pdf_url, '_self')
              }
            }
          }, timeRequest)
        }
      } catch (error) {
        throw error;
      }
    },
    async updateReviewCategory({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(`${backendUrl}/api/business/annual_reports/${payload.annualId}/review_categories/${payload.id}`, {
          method: 'PATCH',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Could't update review category (${response.status})`);
        }
        const data = await response.json()
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async createReviewCategory({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(`${backendUrl}/api/business/annual_reports/${payload.annualId}/review_categories`, {
          method: 'POST',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Could't create review category (${response.status})`);
        }
        const data = await response.json()
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    },
    async deleteReviewCategory({ commit, rootGetters }, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const response = await fetch(`${backendUrl}/api/business/annual_reports/${payload.annualId}/review_categories/${payload.id}`, {
          method: 'DELETE',
          headers: {
            ...rootGetters.authHeaders.headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'business_id': window.localStorage["app.business_id"]
          },
          body: JSON.stringify(payload)
        })
        if (!response.ok) {
          throw new Error(`Could't create review category (${response.status})`);
        }
        const data = await response.json()
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      } finally {
        commit("setLoading", false, {
          root: true
        })
      }
    }
  },
  getters: {
    reviews: state => state.reviews,
    currentReview: state => state.currentReview
  },
};
