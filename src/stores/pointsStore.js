
import { defineStore } from 'pinia';

export const usePointsStore = defineStore('points', {
  state: () => ({
    points: JSON.parse(localStorage.getItem('points')) || [], // Массив точек
    allPointsSelected: JSON.parse(localStorage.getItem('allPointsSelected')) || false, // Состояние для выбора всех точек
    searchQuery: '', // Строка поиска
    activePoint: null, // Состояние для активной точки
    searchResults: [] // Результаты поиска
  }),
  actions: {
    // Генерация точек
  
   
    generatePoints() {
      if (this.points.length === 0) {
        this.points = Array.from({ length: 100 }, (_, i) => {
          const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          const startDate = new Date(2023, 0, 1);
          const endDate = new Date(2023, 11, 31);

          const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return {
            title: "Точка",
            id: i + 1,
            x: Math.round(Math.random() * 100), // Округляем до целого
            y: Math.round(Math.random() * 100), // Округляем до целого
            activePoint: false,
            r: Math.round(Math.random() * 100), // Округляем до целого
            codpoints: Math.round(Math.random() * 1000000), // Округляем до целого
            selected: false, // Инициализируем состояние selected для каждой точки
            timeBefore: formatTime(randomDate(startDate, endDate)),
            timeLoading:formatTime(randomDate(startDate, endDate)),
            timeAfter: formatTime(randomDate(startDate, endDate)),
            timeBeforeFact: formatTime(randomDate(startDate, endDate)),
            timeAfterFact: formatTime(randomDate(startDate, endDate))
          };
        });
        this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
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
      this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
      localStorage.setItem('allPointsSelected', JSON.stringify(this.allPointsSelected)); // Сохраняем состояние allPointsSelected в localStorage
    },
    // Установка активной точки
    setActivePoint(pointId) {
      this.points.forEach(point => {
        if (point.id === pointId && point.selected) {
          point.activePoint = true;
        } else {
          point.activePoint = false;
        }
      });
      this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
    },
    // Переключение выбора точки
    togglePointSelection(pointId) {
      const point = this.points.find(p => p.id === pointId);
      if (point) {
        point.selected = !point.selected;
        console.log(`Point ${point.id} selected:`, point.selected); // Вывод в консоль
        if (point.selected) {
          this.activePoint = point;
        } else if (this.activePoint?.id === point.id) {
          this.activePoint = null;
        }
        this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
      }
    },
    // Установка строки поиска
    setSearchQuery(query) {
      this.searchQuery = query;
      this.searchPoints();
    },
    // Поиск точек
    searchPoints() {
      if (this.searchQuery) {
        const searchId = parseInt(this.searchQuery, 10);
        const foundPoint = this.points.find(point => point.id === searchId);
        this.searchResults = foundPoint ? [foundPoint] : [];
      } else {
        this.searchResults = [];
      }
    },
    // Обновление точки
    updatePoint(updatedPoint) {
      const index = this.points.findIndex(point => point.id === updatedPoint.id);
      if (index !== -1) {
        this.points[index] = { ...updatedPoint }; // Обновляем точку в хранилище
        this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
      }
    },
    // Сохранение точек в localStorage
    savePointsToLocalStorage() {
      localStorage.setItem('points', JSON.stringify(this.points));
    },
    addPoint(point) {
      const lastId = this.points.length > 0 ? this.points[this.points.length - 1].id : 0;
      point.id = lastId + 1;
      this.points.push(point);
      this.savePointsToLocalStorage(); // Сохраняем точки в localStorage
    }
  }
});