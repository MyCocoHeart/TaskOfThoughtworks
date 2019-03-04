const datbase = require("./datbase");
module.exports = function printInventory(inputs) {
    let allItemInfo = getAllItemInfo();
    let order = getUserOrder(inputs);
    let orderPromotions = getUserPromotion(order);
    let printResult = printInfo(allItemInfo,order,orderPromotions);
    console.log(printResult);
};

function getAllItemInfo() {
    let allItems = datbase.loadAllItems();
    let names = {};
    let units = {};
    let prices = {};
    for(var i=0;i<allItems.length;i++){
        let item = allItems[i];
        let id = item['barcode'];
        names[id] = item['name'];
        units[id] = item['unit'];
        prices[id] = item['price'].toFixed(2);
    };
    return{'names':names,'units':units,'prices':prices};
};

function getUserOrder(inputs) {
    let order = {};
    inputs.sort();
    for(var i=0;i<inputs.length;i++){
        let goods = inputs[i];
        let barcode = '';
        let num = 0;
        if(goods.length===10){
            barcode = goods;
            num = 1;
        }
        else {
           let goodsInfo = goods.split('-');
           barcode = goodsInfo[0];
           num = parseInt(goodsInfo[1]);
        };
        if(order.hasOwnProperty(barcode)){
            order[barcode] += num;
            }
        else{
            order[barcode] = num;
            };
    };
    return order;
}
function getUserPromotion(order) {
    let orderPromotions={};
    let allPromotions = datbase.loadPromotions();
    for (var key in order){
        if(parseInt(order[key]/2)){
            for(var i=0;i<allPromotions[0]['barcodes'].length;i++){
                if(key===allPromotions[0]['barcodes'][i]){
                    orderPromotions[key] = 1;
                    break;
                }
            }

        };
    };
    return orderPromotions;
}
function printInfo(allItemInfo,order,orderPromotions) {
    let names = allItemInfo['names'];
    let units = allItemInfo['units'];
    let prices = allItemInfo['prices'];
    let endPrice = 0.0;
    let totalCost = 0.0;
    let saved = 0.0;
    let result = "***<没钱赚商店>购物清单***";
    for(var key in order){
        if(orderPromotions.hasOwnProperty(key)){
            endPrice = (order[key]-orderPromotions[key])*prices[key];
            saved += orderPromotions[key] *prices[key];
        }
        else {
            endPrice = order[key]*prices[key];
        }
        totalCost += endPrice;
        result += "\n名称："+ names[key]+'，数量：'+order[key]+units[key]+'，单价：'+prices[key] + "(元)，小计：" + endPrice.toFixed(2) + "(元)";
    }
    result += '\n----------------------';
    if(orderPromotions!={}){
        result += '\n挥泪赠送商品：';
        for (var promotionId in orderPromotions){
            result += '\n名称：'+names[promotionId]+'，数量：'+orderPromotions[promotionId]+units[promotionId];
        };

    };
    result += "\n----------------------";
    result += "\n总计：" +totalCost.toFixed(2)+ "(元)";
    result +="\n节省：" +saved.toFixed(2)+ "(元)";
    result += "\n**********************";
    return result;

}