const getAllCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const sortedCountries = data
            .map(country => country.name.common)
            .sort((a, b) => {
                if (a === 'Greece') return -1;
                if (b === 'Greece') return 1;
                return a.localeCompare(b);
            });

        return sortedCountries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};

const getCountryFlag = async (country) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await response.json();

        return data[0].flags[0];
    } catch (error) {
        console.error('Error fetching country flag:', error);
        return '';
    }
};

export {
    getAllCountries,
    getCountryFlag
}