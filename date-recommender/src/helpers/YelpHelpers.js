export default {
    getTextDescriptionOfDollarSigns(dollarSigns) {
        switch(dollarSigns)
        {
            case "$":
                return "Cheap";
            case "$$":
                return "Reasonable";
            case "$$$":
                return "Expensive";
            case "$$$$":
                return "Really Expensive";
        }
    }
};