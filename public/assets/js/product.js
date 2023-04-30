const variantSelect = document.querySelector("#variant-select");
const pricePerProductCell = document.querySelector("#price-per-product");

const totalCell = document.querySelector("#total-price");

const numberOfItems = document.querySelector("#no-items");

updateProductTable();

variantSelect.addEventListener("change",updateProductTable );
numberOfItems.addEventListener("change",updateProductTable );

function updateProductTable(){
  selectedVariant = JSON.parse(variantSelect.value).price;

  pricePerProductCell.textContent = selectedVariant;
  
  let noOfItems = numberOfItems.value;
    if (noOfItems<0){
        noOfItems = 0 ;
    }
  totalCell.textContent = (selectedVariant * noOfItems).toFixed(2);
}

const decreaseBtn = document.querySelector('#decrease-btn');
const increaseBtn = document.querySelector('#increase-btn');
const quantityInput = document.querySelector('#no-items');

decreaseBtn.addEventListener('click', function() {
  if (quantityInput.value > 1) {
    quantityInput.value--;
      updateProductTable();
  }
});

increaseBtn.addEventListener('click', function() {
  quantityInput.value++;
    updateProductTable();
});



