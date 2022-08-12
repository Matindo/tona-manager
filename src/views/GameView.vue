<template>
  <b-container>
    <b-row class="main">
      <h2>Open Tournaments</h2>
      <div class="container w-100">
        <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3" align="center" justified>
        <b-tab title="Start New Tournament">
          <b-card-title>Enter the details of your tournament below to begin</b-card-title>
          <b-card-text>
            <b-form @submit.prevent="createTournament" @reset="resetForm" v-show="showForm">
              <b-form-group label-class="font-weight-bold pt-o" label-cols-lg="12" label-size="lg" label="Main Details" class="mb-0 w-100" content-cols="12">
                <b-form-row>
                  <b-col cols="12" lg="6">
                    <b-form-group label="Tournament Name:" label-for="tournName" label-cols="12" content-cols label-cols-lg="5">
                      <b-form-input id="tournName" v-model="tournament.tournName" placeholder="Tournament One" required />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" lg="6">
                    <b-form-group label="Tournament Type:" label-for="tournType" label-cols="12" content-cols label-cols-lg="5">
                      <b-form-select id="tournType" v-model="tournament.tournType" :options="types" required />
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form-group>
              <b-form-group label-class="font-weight-bold pt-o" label-cols-lg="12" label-size="lg" label="Tournament Dates" class="mb-0 w-100" content-cols="12">
                <b-form-row>
                  <b-col cols="12" md="6">
                    <b-form-group label="Start Date:" label-for="startDate" label-cols="12" content-cols label-cols-md="6">
                      <b-form-datepicker id="startDate" v-model="tournament.startDate" :min="firstDate" :max="lastDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" required />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-form-group label="End Date:" label-for="endDate" label-cols="12" content-cols label-cols-md="6">
                      <b-form-datepicker id="endDate" v-model="tournament.endDate" :min="today" :max="lastDate" :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }" locale="en" required />
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form-group>
              <b-form-group label-class="font-weight-bold pt-o" label-cols-lg="12" label-size="lg" label="Team Details" class="mb-0 w-100" content-cols="12">
                <b-form-row>
                  <b-col cols="12" md="6">
                    <b-form-group label="Number of Teams:" label-for="teams" label-cols="12" content-cols label-cols-md="7">
                      <b-form-input id="teams" v-model.number="tournament.totalTeams" min="0" type="number" required />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-form-group label="Members Per Team:" label-for="teamSize" label-cols="12" content-cols label-cols-md="7">
                      <b-form-input id="teamSize" v-model.number="tournament.teamSize" min="0" type="number" required />
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form-group>
              <b-form-group label-class="font-weight-bold pt-o" label-cols-lg="12" label-size="lg" label="Rounds Details" class="mb-0 w-100" content-cols="12">
                <b-form-row>
                  <b-col cols="12" md="6">
                    <b-form-group v-show="tournament.tournType !== 'K'" label="Preliminary Rounds:" label-for="premRounds" label-cols="12" content-cols label-cols-md="7">
                      <b-form-input id="premRounds" v-model.number="tournament.premRounds" min="0" type="number" />
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6">
                    <b-form-group v-show="tournament.tournType !== 'P'" label="Knock-Out Rounds:" label-for="koRounds" label-cols="12" content-cols label-cols-md="7">
                      <b-form-input id="koRounds" v-model.number="tournament.koRounds" min="0" type="number" />
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-form-group>
              <div class="form-buttons">
                <b-button type="submit" variant="outline-success" pill>Start Tournament</b-button>
                <b-button type="reset" variant="outline-danger" pill>Reset Form</b-button>
              </div>
            </b-form>
          </b-card-text>
        </b-tab>
        <b-tab title="Resume Tournament">
          <b-card-title>Chooose from the currently running tournaments to continue</b-card-title>
          <b-card-text>
            <tourn-table title="Open Tournaments" />
          </b-card-text>
        </b-tab>
      </b-tabs>
      </div>
    </b-row>
    <b-row class="second">
      <h2>Completed Tournaments</h2>
      <div class="container w-100">
        <div class="accordion" role="tablist">
          <tourn-summary v-for="(tourn, index) in completeTournaments" :tournament="tourn" :key="index" />
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import TournTable from '@/components/TournsTable.vue'
import TournSummary from '@/components/TournSummary.vue'

export default {
  components: { TournTable, TournSummary },
  name: 'GameView',
  data: function () {
    const now = new Date()
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const maxDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    return {
      tournament: {
        tournName: '', tournType: null, totalTeams: 0, teamSize: 0, premRounds: 0, koRounds: 0, startDate: nowDate, endDate: null
      },
      today: nowDate,
      firstDate: minDate,
      lastDate: maxDate,
      showForm: true,
      types: [
        { text: '- select tournament type -', value: null },
        { text: 'Knockouts Only', value: 'K' },
        { text: 'Preliminaries(Rounds) Only', value: 'P' },
        { text: 'Preliminaries and/then Knockouts', value: 'PK' }
      ],
      completeTournaments: [
        { id: '656', name: 'Test Tournament 1', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '657', name: 'Test Tournament 2', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '658', name: 'Test Tournament 3', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '659', name: 'Test Tournament 4', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' }
      ],
      runningTournaments: []
    }
  },
  methods: {
    createTournament: function () {
      // create new tournament
    },
    resetForm: function () {
      this.showForm = false
      this.$nextTick(() => {
        this.tournament = { tournName: '', tournType: null, totalTeams: 0, teamSize: 0, premRounds: 0, koRounds: 0, startDate: this.today, endDate: null }
      })
      this.showForm = true
    }
  }
}
</script>

<style scoped lang="scss">
form {
  margin: 7px;
  padding: 5px;
  border: ridge black 1px;
  border-radius: 5px;
}
.form-buttons {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
.second {
  display: flex;
  flex-direction: column;
  padding: 1em;
  .container {
    padding: 7px;
  }
}
</style>
