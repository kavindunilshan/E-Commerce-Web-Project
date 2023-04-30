

const citySelect = document.querySelector("#city-select");
const deliveryDateCell = document.querySelector('#deliverytime-table td:nth-child(2)');

citySelect.addEventListener("change", updateDeliveryTable);

function updateDeliveryTable(){
  const cityDelDate = citySelect.value[0];
 if (cityDelDate == '1') {
  deliveryDateCell.textContent = cityDelDate+' day';
} else {
  deliveryDateCell.textContent = cityDelDate+' days';
}
}





