import SpecialistFigures from '../business/marketplace/components/SpecialistFigures'
import StarsRating from '../business/marketplace/components/StarsRating'

export default {
  components: {
    SpecialistFigures,
    StarsRating
  },
  computed: {
    userName() {
      return `${this.specialist.first_name} ${this.specialist.last_name}`
    },
    userLocationAndIndustries() {
      const user = this.specialist
      let location = user.city
      
      if (user.state) {
        location = location ? `${location}, ${user.state}` : user.state
      }

      if (user.industries.length > 0) {
        const industriesNames = user.industries.map(item => item.name).join(' ')
        location = location ? `${location} | ${industriesNames}` : industriesNames
      }

      return location
    }
  }
}
