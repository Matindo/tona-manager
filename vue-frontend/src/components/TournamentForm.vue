<template>
  <b-form @submit.prevent="createTournament" @reset="resetForm" v-show="showForm">
    <div class="form-body">
      <div class="form-input-group">
        <label for="tournName">Tournament Name:</label>
        <b-form-input id="tournName" v-model="tournament.tName" placeholder="Tournament One" required />
      </div>
      <div class="form-input-group">
        <label for="tournPlace">Location/Region:</label>
        <b-form-input id="tournPlace" v-model="tournament.tPlace" placeholder="Stars School/Northern Region" required />
      </div>
      <div class="form-input-group">
        <label for="tournType">Tournament Type:</label>
        <b-form-select id="tournType" v-model="tournament.tType" :options="tTypes" required />
      </div>
      <div class="form-input-group">
        <label for="startDate">Start Date:</label>
        <b-form-datepicker id="startDate" v-model="tournament.start" :min="firstDate" :max="lastDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" required />
      </div>
      <!-- <div class="form-input-group" v-show="tournament.tType !== 'K'">
        <label for="premRounds">Preliminary Rounds:</label>
        <b-form-input id="premRounds" v-model.number="tournament.premRounds" min="0" type="number" />
      </div>
      <div class="form-input-group" v-show="tournament.tType !== 'P'">
        <label for="koRounds" label-cols="12">Knock-Out Rounds:</label>
        <b-form-input id="koRounds" v-model.number="tournament.koRounds" min="0" type="number" />
      </div> -->
    </div>
    <div class="form-buttons">
      <b-button type="submit" variant="outline-success" pill>Start Tournament</b-button>
      <b-button type="reset" variant="outline-danger" pill>Reset Form</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  name: 'TournamentForm',
  data: function () {
    const now = new Date()
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const maxDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    return {
      firstDate: minDate,
      lastDate: maxDate,
      today: nowDate,
      showForm: true,
      tTypes: [
        { text: '- select tournament type -', value: null },
        { text: 'Knockouts Only', value: 'K' },
        { text: 'Preliminaries(Rounds) Only', value: 'P' },
        { text: 'Preliminaries and/then Knockouts', value: 'PK' }
      ],
      tournament: {
        tName: '', tPlace: '', tType: null, start: this.today
      }
    }
  },
  methods: {
    resetForm: function () {
      this.showForm = false
      this.$nextTick(() => {
        this.tournament = { tName: '', tPlace: '', tType: null, start: this.today }
      })
      this.showForm = true
    },
    createTournament: function () {
      this.$emit('clickSubmit', this.tournament)
    }
  }
}
</script>

<style scoped>
form {
  margin: .5em;
  padding: .4em;
  border: ridge black 1px;
  border-radius: .6rem;
}

[class*="form-"] {
  display: grid;
  gap: 1rem;
  width: 100%;
}
.form-body {
  grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
}
.form-input-group {
  grid-template-columns: repeat(auto-fit, minmax(min(35rem, 100%), 1fr));
  gap: .4rem;
}
input {
  margin-block-start: 0;
}
.form-buttons {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  margin-block: 1rem;
}
</style>
