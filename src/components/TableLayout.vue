<template>
    <div class="table-container">
        <table class="table-style">
            <thead>
                <tr class="bg-gray-100">
                    <th v-for="(column, index) in columns" :key="index" class="table-title">
                        {{ column.label }}
                    </th>
                    <th v-if="actions.length" class="table-title">Actions</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-300">
                <tr v-for="item in items" :key="item.id" class="bg-white transition-all duration-500 hover:bg-gray-50">
                    <td v-for="(column, index) in columns" :key="index" class="table-item">
                        {{ column.format ? column.format(item[column.key]) : item[column.key] }}
                    </td>
                    <td v-if="actions.length" class="flex p-5 items-center gap-0.5">
                        <button v-for="action in actions" :key="action.label" 
                            :class="action.buttonClass" 
                            @click="$emit(action.event, item)">
                            <i :class="action.iconClass"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    columns: Array,
    items: Array,
    actions: Array,
});
</script>
