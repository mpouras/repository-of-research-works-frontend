<template>    
    <div class="flex items-center gap-2 cursor-pointer" 
        @mouseenter="isHovered = true" 
        @mouseleave="isHovered = false"
        @click="toggleLibrary"
    >
        <i :class="[ 
            'mdi text-3xl',
            isInLibrary 
                ? isHovered ? [icons.libraryAdd, ' text-red-500'] : [icons.library, 'text-yellow-500']
                : isHovered ? [icons.libraryRemove, 'text-yellow-400'] : icons.libraryNotInList
        ]"></i>

        <p v-if="showLabel" :class="[!isHovered ? 'text-thin' : 'text-normal']">	
            {{ isInLibrary ? 'Remove from Library' : 'Add to Library' }}
        </p>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserLibraryStore } from "../stores/userLibrary";
import { icons } from "../utils/icons";

const props = defineProps({
    articleId: Number,
    showLabel: Boolean
});

const userLibraryStore = useUserLibraryStore();
const isHovered = ref(false);

const isInLibrary = computed(() => {
    return Array.isArray(userLibraryStore.libraryItems) 
        ? userLibraryStore.libraryItems.some(item => item.article_id === props.articleId)
        : false;
});

const toggleLibrary = async () => {
    try {
        if (isInLibrary.value) {
            await userLibraryStore.removeFromLibrary(props.articleId);
        } else {
            await userLibraryStore.addToLibrary({ article_id: props.articleId });
        }
    } catch (error) {
        console.error("Error toggling library:", error);
    }
};
</script>

<style scoped></style>