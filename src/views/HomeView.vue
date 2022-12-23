<template>
  <b-container>
    <b-row class="main">
      <h2>Open Tournaments</h2>
      <div class="container w-100">
        <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3" align="center" justified>
        <b-tab title="Start New Tournament">
          <b-card-title>Enter the details of your tournament below to begin</b-card-title>
          <b-card-text>
            <tournament-form />
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
import TournamentForm from '@/components/TournamentForm.vue'

export default {
  components: { TournTable, TournSummary, TournamentForm },
  name: 'GameView',
  data: function () {
    return {
      completeTournaments: [
        { id: '656', name: 'Test Tournament 1', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '657', name: 'Test Tournament 2', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '658', name: 'Test Tournament 3', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' },
        { id: '659', name: 'Test Tournament 4', details: 'fjdfdjfdjhfxjdfsjtszhtshdsyreahteautzhgdhxtdsrjdsayresursyreardxdssyteersttreeayt dutrduuy utryrsdsurstrstrs' }
      ],
      runningTournaments: []
    }
  }
}
</script>

<style scoped lang="scss">
.second {
  display: flex;
  flex-direction: column;
  padding: 1em;
  .container {
    padding: 7px;
  }
}
</style>
