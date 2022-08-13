<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="collapsible">
        <div class="togglebar w-100 my-2">
          <h3>Preliminary Rounds</h3>
          <b-button size="sm" v-if="showPrem" @click="popPrem" variant="outline-warning">Finish Rounds</b-button>
          <b-button size="sm" @click="premVisible = !premVisible" variant="outline-primary">
            <b-icon icon="caret-down" v-show="!premVisible"></b-icon>
            <b-icon icon="caret-up" v-show="premVisible"></b-icon>
          </b-button>
        </div>
        <b-collapse id="prem-table" :visible="premVisible" class="m-1">
          <tourn-table :teams="premTeams" />
        </b-collapse>
      </b-col>
      <b-col cols="12" class="collapsible">
        <div class="togglebar w-100 my-2">
          <h3>Knockout Rounds</h3>
          <b-button size="sm" v-if="showKO" @click="popKO" variant="outline-warning">Finish Rounds</b-button>
          <b-button size="sm" @click="koVisible = !koVisible" variant="outline-primary">
            <b-icon icon="caret-down" v-show="!koVisible"></b-icon>
            <b-icon icon="caret-up" v-show="koVisible"></b-icon>
          </b-button>
        </div>
        <b-collapse id="ko-table" :visible="koVisible" class="m-1">
          <knock-outs :teams="koTeams" />
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TournTable from '@/components/TournTable.vue'
import { mapGetters } from 'vuex'
import KnockOuts from '@/components/KnockOuts.vue'
export default {
  components: { TournTable, KnockOuts },
  name: 'TournamentView',
  data: function () {
    return {
      koVisible: false,
      premVisible: true,
      premTeams: [],
      koTeams: [],
      emptyTournament: { round: 1, tournType: 'PK', stage: 'P' }
    }
  },
  computed: {
    ...mapGetters({
      tourn: 'TOURNAMENT'
    }),
    tournament: function () {
      if (this.tourn !== {}) {
        return this.tourn
      } else {
        return this.emptyTournament
      }
    },
    showPrem: function () {
      return this.tournament.stage === 'P'
    },
    showKO: function () {
      return this.tournament.stage === 'K'
    }
  }
}
</script>

<style scoped lang="scss">
.collapsible {
  border-bottom: 3px grey ridge;
}
.togglebar {
  display: inline-flex;
  justify-items: flex-end;
  align-items: center;
  h3 {
    margin-right: auto;
    margin-left: 0
  }
}
</style>
