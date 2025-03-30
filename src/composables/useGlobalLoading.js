import { reactive } from 'vue';

const state = reactive({
    isLoading: false,
    text: '',
});

export function useGlobalLoading() {
    const showLoading = (text = 'Loading...') => {
        state.isLoading = true;
        state.text = text;
    };

    const hideLoading = () => {
        state.isLoading = false;
    };

    return {
        state,
        showLoading,
        hideLoading,
    };
}
