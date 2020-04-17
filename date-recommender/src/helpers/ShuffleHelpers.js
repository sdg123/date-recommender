import shuffler from 'shuffle-array'

export default {
    getShuffledArray(array) {
        return shuffler(array, {'copy': true});
    },
    cycleToNextElement(currentIndex, arrayLength) {
        return (currentIndex + 1) > arrayLength ? 0 : ++currentIndex; 
    }
};