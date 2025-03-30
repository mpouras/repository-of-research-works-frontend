<template>
    <div class="top-2 right-2">  
        <Menu as="div" class="relative">
            <MenuButton class="table-button group hover:bg-black">
                <i :class="[icons.dropdown, 'text-xl text-black group-hover:text-white']"></i>
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems class="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem v-if="updateAction" v-slot="{ active }">
                            <button class="w-full text-left px-2 py-2 hover:bg-gray-100"
                                @click="updateAction"    
                            >
                                <i :class="icons.update"></i> Update
                            </button>
                        </MenuItem>
                        <MenuItem v-if="detachAction" v-slot="{ active }">
                            <button class="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100"
                                @click="detachAction"    
                            >
                                <i :class="icons.detach"></i> Detach
                            </button>
                        </MenuItem>
                        <MenuItem v-if="deleteAction" v-slot="{ active }">
                            <button class="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100"
                                @click="deleteAction"
                            >
                                <i :class="icons.delete"></i> Delete
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { icons } from '../utils/icons';

const props = defineProps({
    updateAction: Function,
    deleteAction: Function,
    detachAction: Function
})
</script>

<style scoped>

</style>