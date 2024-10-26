<!-- UpdatePoint.vue -->
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
                    <!-- Добавьте поля для времени, если они есть в вашем объекте точки -->
                </ul>
            </div>
        </div>
        <div class="flex gap-10">
            <button
                class="px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300">Сохранить</button>
            <button
                class="px-4 py-2 my-20 border-2 border-fuchsia-700 rounded-xl text-fuchsia-700 hover:bg-fuchsia-700 hover:text-white transition-all ease-in duration-300">Отмена</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        point: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
/* Добавьте свои стили здесь */
</style>