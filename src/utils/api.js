import { useToastStore } from "../stores/toasts";

function buildApiQueryParams(params = {}) {
    const queryParams = [];
  
    if (params.query) queryParams.push(`query=${params.query}`);
    if (params.model) queryParams.push(`model=${params.model}`);
    if (params.page) queryParams.push(`page=${params.page}`);
    if (params.per_page) queryParams.push(`per_page=${params.per_page}`);
    if (params.sort_by) queryParams.push(`sort_by=${params.sort_by}`);
    if (params.sort_order) queryParams.push(`sort_order=${params.sort_order}`);
  
    return queryParams.length ? `?${queryParams.join('&')}` : '';
}

function buildApiSearchParams(params = {}) {
    const searchParams = [];

    if (params.query) searchParams.push(`query=${params.query}`);
    if (params.model) searchParams.push(`model=${params.model}`);
    if (params.publication_id) searchParams.push(`publication_id=${params.publication_id}`);
    if (params.volume_number) searchParams.push(`volume_number=${params.volume_number}`);
    if (params.issue_name) searchParams.push(`issue_name=${params.issue_name}`);

    return searchParams.length ? `?${searchParams.join('&')}` : '';
}

function handleApiErrors(data) {
    if (data.errors) {
        Object.values(data.errors).flat().forEach(msg => {
            useToastStore().showInstantToast(msg, 'error');
        });
    } else {
        useToastStore().showInstantToast(data.message, 'error');
    }
}

export {
    buildApiQueryParams,
    buildApiSearchParams,
    handleApiErrors,
}