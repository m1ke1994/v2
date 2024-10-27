<script>
import PointsDisplay from './components/PointsDisplay.vue';
import MapComponent from './components/MapComponent.vue';
import UpdatePoint from './components/UpdatePoint.vue';
import CreatePoint from './components/CreatePoint.vue';
import { usePointsStore } from '@/stores/pointsStore';

export default {
  components: {
    PointsDisplay,
    MapComponent,
    UpdatePoint,
    CreatePoint
  },
  data() {
    return {
      selectedPoint: {},
      editingPoint: null,
      isEditing: false,
      isCreating: false,
    };
  },
  methods: {
    handleEditPoint(point) {
      this.selectedPoint = { ...point };
      this.isEditing = true;  // Создаем копию точки для редактирования
    },
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
    handleSaveChanges(updatedPoint) {
      const pointsStore = usePointsStore();
      pointsStore.updatePoint(updatedPoint); // Обновляем точку в хранилище
      this.selectedPoint = null;
      this.isEditing = false; // Сбрасываем выбранную точку
    },
    handleCancelChanges() {
      this.selectedPoint = null;
      this.isEditing = false; // Сбрасываем выбранную точку
    },
    handleCreatePoint() {
      this.isCreating = true; // Устанавливаем состояние для отображения CreatePoint
    },
    handleCancelCreate() {
      this.isCreating = false; // Сбрасываем состояние для скрытия CreatePoint
    },
    handleSavePoint() {
      this.isCreating = false; // Скрываем CreatePoint после сохранения точки
    }
  },
  mounted() {
    const pointsStore = usePointsStore();
    pointsStore.generatePoints(); // Генерируем точки при монтировании
  }
};
</script>

<template>
  <div class="w-full flex gap-24 m-10">
    <div class="w-1/4">
      <PointsDisplay @point-selected="handlePointSelected" @point-selectedAll="AllhandlePointSelected"
        @edit-point="handleEditPoint" @create-point="handleCreatePoint" />
    </div>
    <div class="w-2/3" v-if="!isEditing && !isCreating">
      <MapComponent ref="mapComponent" @pointActive="handlePointActive" />
    </div>
    <div v-else-if="isEditing">
      <UpdatePoint :point="selectedPoint" v-if="selectedPoint" @save-changes="handleSaveChanges"
        @cancel-changes="handleCancelChanges" />
    </div>
    <div v-else-if="isCreating">
      <CreatePoint @cancel-create="handleCancelCreate" @save-point="handleSavePoint" :isCreating="isCreating" />
    </div>
  </div>
</template>

<style scoped></style>
