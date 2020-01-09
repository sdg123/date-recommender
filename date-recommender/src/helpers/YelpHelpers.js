export default {
    getTextDescriptionOfDollarSigns(dollarSigns) {
        var approxString = "Approx";
        var dollarSignsToDescriptionsMap = {
            "$":`${approxString} $10`,
            "$$": `${approxString} $11 to $30`,
            "$$$": `${approxString} $31 to $60`,
            "$$$$": `Above $60`
        };

        return dollarSignsToDescriptionsMap[dollarSigns];
    }
};