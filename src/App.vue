<script>
import PointsDisplay from './components/PointsDisplay.vue'
import MapComponent from './components/MapComponent.vue'
import UpdatePoint from './components/UpdatePoint.vue'

export default {
  components: {
    PointsDisplay,
    MapComponent,
    UpdatePoint

  },
  methods: {
    handlePointSelected(pointId) {
      // Передаем событие в MapComponent
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
    AllhandlePointSelected() {
      // Передаем событие в MapComponent
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
    handlePointActive() {
      // Передаем событие в MapComponent
      this.$refs.mapComponent.updateMarkers(this.$refs.mapComponent.pointsStore.points);
    },
  }
}
</script>

<template>
  <div class="w-full flex gap-4 m-10">
    <div class="w-1/4">
      <PointsDisplay @point-selected="handlePointSelected" @point-selectedAll="AllhandlePointSelected" />
    </div>
    <div class="w-2/3">
      <MapComponent ref="mapComponent" @pointActive="handlePointActive" />
    </div>
  </div>
</template>


<style scoped></style>
