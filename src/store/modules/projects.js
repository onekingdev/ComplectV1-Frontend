import * as jwt from '@/services/common/projects'

const mapAuthProviders = {
  jwt: {
    getProjects: jwt.getProjects,
    createProject: jwt.createProject,
    deleteDocument: jwt.deleteDocument,
    deletePostProject: jwt.deletePostProject,
    addCollaborator: jwt.addCollaborator
  },
}

import LocalProject from "../../models/LocalProject";
import { createProposal, updateProposal, deleteTimeSheet, denyEndContract } from '../../services/specialist/projects';

export default {
  state: {
    projects: [],
    currentProject: null,
    currentProposal: null
  },
  mutations: {
    SET_PROJECTS(state, payload) {
      state.projects = payload
    },
    SET_CURRENT_PROJECT (state, payload) {
      state.currentProject = payload
    },
    ADD_PROJECT(state, payload) {
      state.projects.push(payload)
    },
    SET_CURRENT_PROPOSAL(state, payload) {
      state.currentProposal = payload
    }
  },
  actions: {
    async getProjects({state, commit, rootState}) {
      commit("clearError", null, { root: true });
      commit("setLoading", true, { root: true });
      try {
        const getProjects = mapAuthProviders[rootState.shared.settings.authProvider].getProjects
        const endpointUrl = rootState.shared.shared.userType === 'specialist' ? '/specialist/projects/my' : '/local_projects'
        const data = getProjects(endpointUrl)
          .then((success) => {
            commit("clearError", null, { root: true });
            commit("setLoading", false, { root: true });
            if (success) {
              const data = success.data
              const projects = []
              for (const item of data) {
                projects.push(new LocalProject(
                  item.business,
                  item.business_id,
                  item.cost,
                  item.created_at,
                  item.description,
                  item.ends_on,
                  item.hide_on_calendar,
                  item.id,
                  item.projects,
                  item.reminders,
                  item.starts_on,
                  item.status,
                  item.title,
                  item.updated_at,
                  item.visible_project,
                ))
              }
              commit('SET_PROJECTS', projects)
              return data
            }
            if (!success) {
              console.error('Not success', success)
              commit("setError", success.message, { root: true });
            }
          })
          .catch(error => error)
        return data
      } catch (error) {
        console.error('catch error', error);
        commit("setError", error.message, { root: true });
        commit("setLoading", false, { root: true });
        throw error
      }
    },
    async createProject({state, commit, rootState}, payload) {
      commit("clearError", null, {
        root: true
      });
      commit("setLoading", true, {
        root: true
      });
      try {
        const createProject = mapAuthProviders[rootState.shared.settings.authProvider].createProject
        const endpointUrl = rootState.shared.shared.userType === 'specialist' ? '/specialist/projects/my' : '/local_projects'
        const data = createProject(endpointUrl, payload)
          .then((success) => {
            commit("clearError", null, {
              root: true
            });
            commit("setLoading", false, {
              root: true
            });
            if (success) {
              const data = success.data
              commit('ADD_PROJECT', new LocalProject(
                data.business,
                data.business_id,
                data.cost,
                data.created_at,
                data.description,
                data.ends_on,
                data.hide_on_calendar,
                data.id,
                data.projects,
                data.reminders,
                data.starts_on,
                data.status,
                data.title,
                data.updated_at,
                data.visible_project,
              ))
              return data
            }
            if (!success) {
              commit("setError", success.message, { root: true });
              console.error('Not success', success)
            }
          })
          .catch(error => error)
        return data
      } catch (error) {
        commit("setError", error.message, {
          root: true
        });
        commit("setLoading", false, {
          root: true
        });
        throw error;
      }
      // } finally { commit("setLoading", false, { root: true }) }
    },
    deletePostProject({commit, rootState}, payload) {
      const deletePost = mapAuthProviders[rootState.shared.settings.authProvider].deletePostProject
      const endpointUrl = `/business/projects/${payload.id}`
      return deletePost(endpointUrl, {})
    },
    submitProposal({commit}, payload) {
      return createProposal(payload)
    },
    updateProposal({commit}, payload) {
      return updateProposal(payload)
    },
    deleteTimeSheet({commit}, payload) {
      return deleteTimeSheet(payload)
    },
    deleteDocument({commit, rootState}, payload) {
      const removeDocument = mapAuthProviders[rootState.shared.settings.authProvider].deleteDocument
      return removeDocument(payload)
    },
    denyContract({commit}, payload) {
      return denyEndContract(payload)
    },
    addLocalProjectCollaborator({commit, rootState}, payload) {
      const addCollaborator = mapAuthProviders[rootState.shared.settings.authProvider].addCollaborator
      return addCollaborator(payload)
    }
  },
  getters: {
    projects: state => state.projects,
    currentProject: state => state.currentProject,
    currentProposal: state => state.currentProposal
  },
};
