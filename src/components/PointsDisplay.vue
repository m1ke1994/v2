<!-- PointsDisplay.vue -->


<template>
  <div class="flex justify-between items-center">
    <p class="text-3xl m-4 p-2 font-bold">Точки</p>
    <div class="flex items-center">
      <input type="text" class="border border-gray-300 rounded-l-lg p-2" placeholder="Поиск по точкам"
        v-model="searchQuery" @keyup.enter="searchPoint" />
      <img class="cursor-pointer border border-gray-300 rounded-r-lg p-2" src="/icons.png" alt="search"
        @click="searchPoint" />
    </div>
  </div>
  <div class="flex justify-between p-2 items-center">
    <div class="flex gap-4 m-4 p-2">
      <p><input type="checkbox" id="option2" @change="togglePointAll"></p>
      <label for="option2">Выбрать все ({{ lengthPointsTrue }})</label>
    </div>
  </div>
  <div class="scroll-container">
    <div v-for="point in filteredPoints" :key="point.id"
      :class="['border-2 m-4 p-2  rounded-xl flex justify-between', { 'purple': point.selected, 'active': point.activePoint, 'text-neutral-500': !point.activePoint && !point.selected }]"
      @click="setActivePoint(point.id)">
      <div>
        <input type="checkbox" :id="'option' + point.id" :checked="point.selected" @change="togglePoint(point.id)" />
        <label :for="'option' + point.id" class="m-4 text-lg"><b>{{ point.title }} №{{ point.id }}</b></label>
        <p><b>Координаты</b>:</p>
        <p><b>X</b> {{ point.x }},</p>
        <p><b>Y</b> {{ point.y }}</p>
      </div>
      <img v-if="point.activePoint == true" class="p-10 cursor-pointer rounded-3xl" src="/update.png" alt="update">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { usePointsStore } from '@/stores/pointsStore'

export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState(usePointsStore, ['points']),
    filteredPoints() {
      if (this.searchQuery) {
        const id = parseInt(this.searchQuery, 10)
        return this.points.filter(point => point.id === id)
      }
      return this.points
    },
    lengthPointsTrue() {
      return this.points.filter(point => point.selected).length;
    }
  },
  methods: {
    ...mapActions(usePointsStore, ['generatePoints', 'togglePointSelection', 'toggleAllPoints', 'setActivePoint']),
    searchPoint() {
      // Очищаем поле ввода после поиска
      this.searchQuery = ''
    },
    togglePointAll() {
      this.toggleAllPoints()
      this.$emit('point-selectedAll') // Добавляем событие emit
    },
    togglePoint(pointId) {
      console.log('togglePoint', pointId)
      this.togglePointSelection(pointId)
      this.$emit('point-selected', pointId) // Добавляем событие emit
    }
  },
  mounted() {
    console.log('mounted')
    this.generatePoints()
  }
}
</script>

<style scoped>
.point {
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
}

.purple {
  color: #A275B2
}

.active {
  border-color: #B70DF2;
  color: #B70DF2;
}



.scroll-container {
  max-height: 700px;
  overflow-y: auto;
}
</style>