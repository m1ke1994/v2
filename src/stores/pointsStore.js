
import { defineStore } from 'pinia';

export const usePointsStore = defineStore('points', {
  state: () => ({
    points: JSON.parse(localStorage.getItem('points')) || [],
    selected: true, // Состояние для активной точки
    searchQuery: '',
    activePoint: true, // Состояние для активной точки
    searchResults: []
  }),
  actions: {
    generatePoints() {
      if (this.points.length === 0) {

        this.points = Array.from({ length: 100 }, (_, i) => ({
          title: "Точка",
          id: i + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          activePoint: false,
          r:Math.random() * 100,
          codpoints:Math.random() * 1000,
          selected: false // Инициализируем состояние selected для каждой точки
        }));
        
       
      }
    },
    toggleAllPoints() {
      this.allPointsSelected = !this.allPointsSelected;
      this.points.forEach(point => {
        point.selected = this.allPointsSelected;
        if (this.allPointsSelected) {
          point.activePoint = point.id === this.points[0].id;
        } else {
          point.activePoint = false;
        }
      });
      localStorage.setItem('points', JSON.stringify(this.points));
    },
    setActivePoint(pointId) {
      this.points.forEach(point => {
        if (point.id === pointId && point.selected) {
          point.activePoint = true;
        } else {
          point.activePoint = false;
        }
      });
      localStorage.setItem('points', JSON.stringify(this.points));
    },
    togglePointSelection(pointId) {
      console.log('togglePointSelection', pointId);
      const point = this.points.find(p => p.id === pointId);
      if (point) {
        point.selected = !point.selected;
        console.log(`Point ${point.id} selected:`, point.selected); // Вывод в консоль
        if (point.selected) {
          this.currentPoint = point;
        } else if (this.currentPoint?.id === point.id) {
          this.currentPoint = null;
        }
        localStorage.setItem('points', JSON.stringify(this.points));
      }
    },
    setSearchQuery(query) {
      this.searchQuery = query;
      this.searchPoints();
    },
    searchPoints() {
      if (this.searchQuery) {
        const searchId = parseInt(this.searchQuery, 10);
        const foundPoint = this.points.find(point => point.id === searchId);
        this.searchResults = foundPoint ? [foundPoint] : [];
      } else {
        this.searchResults = [];
      }
    }
  }
});