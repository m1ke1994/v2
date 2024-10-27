<!-- MapComponent.vue -->


<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import * as maptalks from 'maptalks';
import { usePointsStore } from '../stores/pointsStore';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,
      markersLayer: null,
      pointsStore: usePointsStore()
    };
  },
  mounted() {
    // Создаем карту и добавляем ее в контейнер
    this.map = new maptalks.Map(this.$refs.mapContainer, {
      center: [37.6173, 55.7558], // Координаты центра карты (Москва)
      zoom: 13, // Уровень масштабирования
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      })
    });

    this.markersLayer = new maptalks.VectorLayer('markers').addTo(this.map);

    // Инициализация маркеров при монтировании компонента
    this.updateMarkers(this.pointsStore.points);

    // Подписка на изменения в хранилище
    this.$watch(
      () => this.pointsStore.points,
      (newPoints) => {
        this.updateMarkers(newPoints);
      }
    );
  },
  methods: {
    updateMarkers(points) {
      if (!this.markersLayer) return;

      // Очищаем текущие маркеры
      this.markersLayer.clear();

      // Добавляем новые маркеры для выбранных точек
      points.forEach(point => {
        if (point.selected) {
          const marker = new maptalks.Marker([point.x, point.y], {
            symbol: {
              'markerType': 'ellipse',
              'markerWidth': 10,
              'markerHeight': 10,
              'markerFill': point.activePoint ? 'red' : 'purple',
              'markerFillOpacity': 0.8
            }
          }).addTo(this.markersLayer);

          // Добавляем обработчик события для изменения цвета маркера
          this.$watch(
            () => point.activePoint,
            (isActive) => {
              marker.updateSymbol({
                'markerFill': isActive ? 'red' : 'purple'
              });
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 800px;
  /* Высота контейнера для карты */
}
</style>