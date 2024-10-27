<script>
export default {
    props: {
        point: {
            type: Object,
            required: true,
        }
    },
    methods: {
        saveChanges() {
            this.$emit('save-changes', this.point);
        },
        cancelChanges() {
            this.$emit('cancel-changes');
        }
    },
};
</script>
<template>
    <div class="w-full">
        <h1 class="text-3xl text-left my-10">Редактирование точки</h1>
        <div class="w-full flex">
            <div class="w-3/6 pr-4">
                <h1 class="text-xl my-10">Основное</h1>
                <ul class="list-none text-neutral-500">
                    <li>
                        <label>Название</label>
                        <input type="text" v-model="point.title" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Код точки</label>
                        <input type="text" v-model="point.codpoints" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Широта</label>
                        <input type="text" v-model="point.x" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Долгота</label>
                        <input type="text" v-model="point.y" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Радиус</label>
                        <input type="text" v-model="point.r" class="w-full border p-2">
                    </li>
                </ul>
            </div>
            <div class="w-3/6 pl-4">
                <h1 class="text-xl my-10">Время</h1>
                <ul class="list-none text-neutral-500">
                    <li>
                        <label>Время прибытия с:</label>
                        <input type="text" v-model="point.timeBefore" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Время прибытия по:</label>
                        <input type="text" v-model="point.timeAfter" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Время загрузки:</label>
                        <input type="text" v-model="point.timeLoading" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Время прибытия (факт):</label>
                        <input type="text" v-model="point.timeBeforeFact" class="w-full border p-2">
                    </li>
                    <li>
                        <label>Время убытия (факт):</label>
                        <input type="text" v-model="point.timeAfterFact" class="w-full border p-2">
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex gap-10">
            <button
                class=" w-1/5 px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300"
                @click="saveChanges">Сохранить</button>
            <button
                class=" w-1/5 px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300"
                @click="cancelChanges">Отмена</button>
        </div>
    </div>
</template>
<style></style>
