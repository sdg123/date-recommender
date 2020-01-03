export default {
    getTextDescriptionOfDollarSigns(dollarSigns) {
        var approxString = "Approx";
        switch(dollarSigns)
        {
            case "$":
                return `${approxString} $10`;
            case "$$":
                return `${approxString} $11 to $30`;
            case "$$$":
                return `${approxString} $31 to $60`;
            case "$$$$":
                return `Above $60`;
        }
    }
};