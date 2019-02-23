module.exports = function main(mileage,holdTime) {
    result = 0;
    timeCost = holdTime*0.25;
    if(mileage <=0 || holdTime<0){
        return result;
    }
    if(mileage<=2){
        result = 6+timeCost;
    }
    if(mileage>2 && mileage<=8){
        result = 6+(mileage-2)*0.8+timeCost;
    }
    if(mileage>8){
        result = 6+6*0.8+(mileage-8)*1.2+timeCost;
    }
    return Math.round(result);
};