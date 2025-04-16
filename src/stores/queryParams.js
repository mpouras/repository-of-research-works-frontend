import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { watch, reactive, onBeforeMount, onMounted } from 'vue';
import { pageDefaultParams } from '../utils/sort';

export const useQueryParamsStore = defineStore('queryParamsStore', () => {
    const router = useRouter();
    const route = useRoute();

    const defaultParams = reactive(pageDefaultParams(route.name));

    const queryParams = reactive({
        page: Number(route.query.page) || defaultParams.page,
        per_page: Number(route.query.per_page) || defaultParams.per_page,
        sort_by: route.query.sort_by || defaultParams.sort_by,
        sort_order: route.query.sort_order || defaultParams.sort_order,
    });

    // THERE IS A SMALL BUG ON PAGE RETURN
    watch(() => route.name, (newRouteName) => {
        const newDefaults = pageDefaultParams(newRouteName);
        Object.assign(defaultParams, newDefaults);

        queryParams.page = newDefaults.page;
        queryParams.per_page = newDefaults.per_page;
        queryParams.sort_by = newDefaults.sort_by;
        queryParams.sort_order = newDefaults.sort_order;
    });

    function updateRouteParams() {
        const filteredParams = Object.fromEntries(
            Object.entries({ query: route.query.query, ...queryParams, })
            .filter(([key, value]) => value !== defaultParams[key] && value !== undefined)
        );
        router.push({ query: filteredParams });
    }

    function setPage(page) {
        queryParams.page = page;
        updateRouteParams();
    }

    function setPerPage(per_page) {
        queryParams.per_page = per_page;
        updateRouteParams();
    }

    function setSortBy(sort_by) {
        queryParams.sort_by = sort_by;
        updateRouteParams();
    }

    function setSortOrder(sort_order) {
        queryParams.sort_order = sort_order;
        updateRouteParams();
    }

    function resetSort() {
        Object.assign(queryParams, defaultParams);
        updateRouteParams();
    }

    watch(queryParams, () => {
        updateRouteParams();
    }, { deep: true });

    return {
        queryParams,
        setPage,
        setPerPage,
        setSortBy,
        setSortOrder,
        resetSort,
    };
});
