<template>
  <div class="knock-outs">
    <canvas id="viewer"></canvas>
  </div>
</template>

<script>
import { canvasMixin } from '@/mixins/canvasMixin'
export default {
  name: 'KnockOuts',
  mixins: [canvasMixin],
  props: {
    teams: {
      type: Array,
      required: true
    }
  },
  methods: {
    initializeCanvas: function () {
      this.totalTeams = 8
      this.draw()
    }
  },
  mounted: function () {
    this.initializeCanvas()
  }
}
</script>

<style scoped>
.knockouts {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  padding: 5%;
}
#viewer {
  width: 100%;
  height: 100%;
  border: .1px solid rgb(177, 176, 176);
}
</style>
