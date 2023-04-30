const subcategories = {
  12: [
    { value: 'subcategory1', text: 'JBL' },
    { value: 'subcategory2', text: 'Samsung' },
    { value: 'subcategory3', text: 'Bose' }
  ],
  13: [
    { value: 'subcategory4', text: 'JBL' },
    { value: 'subcategory5', text: 'Armageddon' },
    { value: 'subcategory6', text: 'Fantech' }
  ],
  14: [
    { value: 'subcategory4', text: 'Sony' },
    { value: 'subcategory5', text: 'Canon' },
    { value: 'subcategory6', text: 'Nikon' }
  ],
    15: [
    { value: 'subcategory4', text: 'Alexa' },
    { value: 'subcategory5', text: 'Google Assistant' },
    { value: 'subcategory6', text: 'LG' }
  ],
    16: [
    { value: 'subcategory4', text: 'Ninetendo' },
    { value: 'subcategory5', text: 'Playtstation' },
    { value: 'subcategory6', text: 'Xbox' }
  ],
    17: [
    { value: 'subcategory4', text: 'Energizer' },
    { value: 'subcategory5', text: 'Duracell' },
    { value: 'subcategory6', text: 'Exide' }
  ],
     18: [
    { value: 'subcategory4', text: 'Barbie' },
    { value: 'subcategory5', text: 'Disney Princess' },
    { value: 'subcategory6', text: 'Ken' }
  ],
    19: [
    { value: 'subcategory4', text: 'Panda' },
    { value: 'subcategory5', text: 'Elephant' },
    { value: 'subcategory6', text: 'Unicorn' }
  ],
    20: [
    { value: 'subcategory4', text: 'Card games' },
    { value: 'subcategory5', text: 'Tile games' },
    { value: 'subcategory6', text: 'Jigsaw Puzzles' }
  ],

}
// The category dropdown element
const categorySelect = document.getElementById('category-select');

// The subcategory dropdown element
const subcategorySelect = document.getElementById('subcategory-select');


// Update the options in the subcategory dropdown when the selected category changes
categorySelect.addEventListener('change', () => {
  // Get the selected category
  const category = categorySelect.value;
  // Clear the options in the subcategory dropdown
  subcategorySelect.innerHTML = '';
  document.getElementById('subcategory-select').style.display = 'inline-block';
  document.getElementById('label-select-subcategory').style.display = 'inline-block';

  // If a category is selected, add the corresponding subcategories to the dropdown
  if (category) {
    subcategories[category].forEach(subcategory => {
      const option = document.createElement('option');
      option.value = subcategory.value;
      option.text = subcategory.text;
      subcategorySelect.add(option);
      

    });
  }
});