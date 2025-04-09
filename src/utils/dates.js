function formatDate(dateString) {
    if (!dateString) return "Unknown date"; 
    
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat("en-GB", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
    }).format(date);
}

function formatMonthDate(monthYearString) {
    if (!monthYearString) return "Unknown date";

    const [month, year] = monthYearString.split("/").map(Number);

    const date = new Date(year, month - 1);

    return new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric" 
    }).format(date);
}

function getMonthName(monthNumber) {
    const date = new Date(2020, monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
}

function formatDateWithDash(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function formatArticleDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function formatDateTime(dateString) {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(date);
}

export {
    formatDate,
    formatMonthDate,
    getMonthName,
    formatDateWithDash,
    formatArticleDate,
    calculateAge,
    formatDateTime
}