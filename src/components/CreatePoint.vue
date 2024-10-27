<script>
import { usePointsStore } from '@/stores/pointsStore';

export default {
    props: {
        isCreating: Boolean
    },
    data() {
        return {
            title: '',
            id: '',
            x: '',
            y: '',
            activePoint: false,
            r: '',
            codpoints: '',
            selected: false,
            timeBefore: '',
            timeLoading: '',
            timeAfter: '',
            timeBeforeFact: '',
            timeAfterFact: '',
            errorMessage: '',
        }
    },
    methods: {
        savePoint() {
            // Валидация и форматирование данных
            const x = parseFloat(this.x);
            const y = parseFloat(this.y);
            const r = parseFloat(this.r);
            const codpoints = parseInt(this.codpoints, 10);

            const timeBefore = this.validateTime(this.timeBefore);
            const timeLoading = this.validateTime(this.timeLoading);
            const timeAfter = this.validateTime(this.timeAfter);
            const timeBeforeFact = this.validateTime(this.timeBeforeFact);
            const timeAfterFact = this.validateTime(this.timeAfterFact);

            if (isNaN(x) || isNaN(y) || isNaN(r) || isNaN(codpoints) ||
                !timeBefore || !timeLoading || !timeAfter || !timeBeforeFact || !timeAfterFact) {
                this.errorMessage = 'Пожалуйста, проверьте введенные данные.';
                return;
            }

            const point = {
                title: this.title,
                x: x,
                y: y,
                activePoint: this.activePoint,
                r: r,
                codpoints: codpoints,
                selected: this.selected,
                timeBefore: timeBefore,
                timeLoading: timeLoading,
                timeAfter: timeAfter,
                timeBeforeFact: timeBeforeFact,
                timeAfterFact: timeAfterFact,
            };

            // Используем метод хранилища для добавления точки
            const pointsStore = usePointsStore();
            pointsStore.addPoint(point);

            // Очистка формы после сохранения
            this.cancel();

            // Генерируем событие для сохранения точки
            this.$emit('save-point');
        },
        cancel() {
            // Здесь вы можете добавить логику для отмены и очистки формы
            this.title = '';
            this.id = '';
            this.x = '';
            this.y = '';
            this.activePoint = false;
            this.r = '';
            this.codpoints = '';
            this.selected = false;
            this.timeBefore = '';
            this.timeLoading = '';
            this.timeAfter = '';
            this.timeBeforeFact = '';
            this.timeAfterFact = '';
            this.errorMessage = ''; // Очистка сообщения об ошибке

            // Генерируем событие для отмены создания точки
            this.$emit('cancel-create');
        },
        validateTime(time) {
            const timeRegex = /^\d{2}:\d{2}$/;
            if (!timeRegex.test(time)) {
                return null;
            }
            return time;
        }
    }
}
</script>

<template>
    <div class="w-full">
        <h1 class="text-3xl text-left my-10">Создание точки</h1>
        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        <div class="w-full flex">
            <div class="w-3/6 pr-4">
                <h1 class="text-xl my-10">Основное</h1>
                <ul class="list-none text-neutral-500">
                    <li>
                        <label>Название</label>
                        <input v-model="title" type="text" class="w-full border p-2" placeholder="Например, Точка">
                    </li>
                    <li>
                        <label>Код точки</label>
                        <input v-model="codpoints" type="text" class="w-full border p-2" placeholder="Например, 65">
                    </li>
                    <li>
                        <label>Широта</label>
                        <input v-model="x" type="text" class="w-full border p-2" placeholder="Например, 65">
                    </li>
                    <li>
                        <label>Долгота</label>
                        <input v-model="y" type="text" class="w-full border p-2" placeholder="Например, 65">
                    </li>
                    <li>
                        <label>Радиус</label>
                        <input v-model="r" type="text" class="w-full border p-2" placeholder="Например, 65">
                    </li>
                </ul>
            </div>
            <div class=" w-3/6 pl-4">
                <h1 class="text-xl my-10">Время</h1>
                <ul class="list-none text-neutral-500">
                    <li>
                        <label>Время прибытия с:</label>
                        <input v-model="timeBefore" type="text" class="w-full border p-2" placeholder="Например, 16:40">
                    </li>
                    <li>
                        <label>Время прибытия по:</label>
                        <input v-model="timeAfter" type="text" class="w-full border p-2" placeholder="Например, 16:40">
                    </li>
                    <li>
                        <label>Время загрузки:</label>
                        <input v-model="timeLoading" type="text" class="w-full border p-2"
                            placeholder="Например, 16:40">
                    </li>
                    <li>
                        <label>Время прибытия (факт):</label>
                        <input v-model="timeBeforeFact" type="text" class="w-full border p-2"
                            placeholder="Например, 16:40">
                    </li>
                    <li>
                        <label>Время убытия (факт):</label>
                        <input v-model="timeAfterFact" type="text" class="w-full border p-2"
                            placeholder="Например, 16:40">
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex gap-10">
            <button @click="savePoint"
                class="w-1/5 px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300">Создать</button>
            <button @click="cancel"
                class="w-1/5 px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300">Отмена</button>
        </div>
    </div>
</template>

<style></style>