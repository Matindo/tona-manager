<template>
  <div class="footbar">
    <b-row>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'FootBar'
}
</script>

<style scoped lang="scss">
.footbar {
  bottom: 0;
  width: 100vw;
  display: inline-flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: stretch;
}
</style>
