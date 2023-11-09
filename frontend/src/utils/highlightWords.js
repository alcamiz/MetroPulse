export const highlightWords = (desc, highlight) => {
    // Return early if desc is null or undefined
    if (desc === null || typeof desc === 'undefined') {
        return '';
    }

    const terms = highlight ? highlight.split(" ").filter(Boolean) : [];

    if(!terms.length) {
        return desc;
    }
    const regex = new RegExp(
        terms.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
        "gi"
    );
    const highlighted = desc.replace(regex, (match) => {
        return `<span class="highlight"><mark>${match}</mark></span>`;
    });

    return highlighted;
}