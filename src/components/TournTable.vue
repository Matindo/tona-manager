<template>
  <b-table sticky-header :fields="fields" :items="teams" sort-by="totalPoints" sort-null-last sort-desc outlined striped no-border-collapse responsive="lg" show-empty :busy="isBusy">
    <template #head()="scope">
      <div class="text-nowrap">{{scope.label}}</div>
    </template>
    <template #cell(position)="data">
      {{ data.index + 1 }}
    </template>
    <template #cell(teamName)="data">
      <td :class="[data.index < 8 ? 'bg-success' : '']">{{data.item.teamName}}</td>
    </template>
    <template #cell(show_details)="row">
      <b-button size="sm" @click="row.toggleDetails" class="mr-2">
        {{ row.detailsShowing ? 'Hide' : 'Show'}} Team Details
      </b-button>
    </template>
    <template #row-details="row">
      <b-card class="w-100">
        <b-row class="m-2">
          <b-col sm="4" class="text-sm-right">
            <span><b>First Speaker: </b>{{row.item.speaker1}}</span>
            <span><b>Points: </b>{{row.item.p1}}</span>
            <b-button block pill variant="outline-info" @click="viewSpeaker(row.item.id1)">More Info</b-button>
          </b-col>
          <b-col sm="4" class="text-sm-right">
            <span><b>Second Speaker: </b>{{row.item.speaker2}}</span>
            <span><b>Points: </b>{{row.item.p2}}</span>
            <b-button block pill variant="outline-info" @click="viewSpeaker(row.item.id2)">More Info</b-button>
          </b-col>
          <b-col sm="4" class="text-sm-right">
            <span><b>Third Speaker: </b>{{row.item.speaker3}}</span>
            <span><b>Points: </b>{{row.item.p3}}</span>
            <b-button block pill variant="outline-info" @click="viewSpeaker(row.item.id3)">More Info</b-button>
          </b-col>
        </b-row>
        <b-button block pill size="sm" variant="outline-secondary" @click="row.toggleDetails">Hide Details</b-button>
      </b-card>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'TournTable',
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      fields: [
        { key: 'position', stickyColumn: true, isRowHeader: true },
        { key: 'teamName', value: 'Team', stickyColumn: true }, 'rounds', 'w', 'd', 'l', 'points', 'show_details'
      ],
      isBusy: false
    }
  },
  methods: {
    toggleBusyState: function () {
      this.isBusy = !this.isBusy
    },
    viewSpeaker: function (speakerId) {
      // open modal for viewing speakers
    }
  }
}
</script>

<style scoped>

</style>
