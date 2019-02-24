function bestCharge(selectedItems) {
  let itemCount = getItemCount(selectedItems);
  let itemsInfo = getAllItemInfo();
  let allPromotions = loadPromotions();
  let detailPromotion = getDetailPromotion(itemCount,itemsInfo,allPromotions);
  let result = resultPrint(itemCount,itemsInfo,detailPromotion);
  return result;
  return /*TODO*/;//return bestCharge
}
function getItemCount(selectedItems) {
  let result = {};
  for (var i=0;i<selectedItems.length;i++){
    let item = selectedItems[i].trim().split(' x ');
    result[item[0]]=parseInt(item[1]);
  };
  return result;
}
function getAllItemInfo() {
  let allItems = loadAllItems();
  let names = {};
  let prices = {};
  for (var i=0;i<allItems.length;i++){
    let id = allItems[i]['id'];
    let name = allItems[i]['name'];
    let price = allItems[i]['price'];
    names[id] = name;
    prices[id] = price;
  };
return [names,prices]
}

function getDetailPromotion(itemCount,itemInfo,allPromotions) {
  let result = {};
  let names = itemInfo[0];
  let prices = itemInfo[1];
  let totalPrice = 0;
  let saved = 0.0;
  let promoteItemName = '';
  let flag = 0;
  let promoteditems = allPromotions[1]['items'];
  for(var key in itemCount){
    totalPrice += itemCount[key]*prices[key];
    for (var j=0;j<promoteditems.length;j++ ){
     if (key === promoteditems[j]){
      flag = 1;
      saved += ((prices[key]/2)*itemCount[key]);
      promoteItemName += (names[key]+'，');
      };
    };

  };
  if(flag===0){
     result['type'] = null;
     result['endPrice'] = totalPrice;
     result['saved'] = null;
  }
  else{
    result['type'] = allPromotions[1]['type']+'('+promoteItemName.substr(0,promoteItemName.length-1)+')';
    result['endPrice'] = totalPrice-saved;
    result['saved'] = saved;
    if(totalPrice>=30 && result['endPrice']>=totalPrice-6){
      result['type'] = allPromotions[0]['type'];
      result['endPrice'] = totalPrice -6;
      result['saved'] = 6;
    };
  };
  return result;
}
function resultPrint(itemCount,itemInfo,detailPromoteInfo) {
  let result = "============= 订餐明细 =============";
  let names = itemInfo[0];
  let prices = itemInfo[1];
  for(var key in itemCount){
    let price = itemCount[key]*prices[key];
     result += "\n" + names[key]+ " x " + itemCount[key] + " = " + price + "元";
  }

  if(detailPromoteInfo['type']!=null){
    result += "\n-----------------------------------";
    result += "\n使用优惠:";
    result += "\n"+detailPromoteInfo['type']+"，省"+detailPromoteInfo['saved']+"元";
  }
  result += "\n-----------------------------------";
  result += "\n总计：" + detailPromoteInfo['endPrice'] + "元";
  result += "\n===================================";
  return result
}
