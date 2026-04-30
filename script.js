let currentStep = 1;
let total = 0;

// Initialize default selection on page load
window.addEventListener('DOMContentLoaded', function() {
  const firstMotorcycle = document.querySelector('#step1 .option-card');
  if(firstMotorcycle) {
    selectOption(firstMotorcycle, 1000);
  }
});

function nextStep() {
  if(currentStep < 4){
    document.getElementById("step"+currentStep).classList.remove("active-step");
    document.getElementById("s"+currentStep).classList.remove("active");

    currentStep++;

    document.getElementById("step"+currentStep).classList.add("active-step");
    document.getElementById("s"+currentStep).classList.add("active");
  }

  if(currentStep == 4){
    document.querySelector(".next-btn").style.display = "none";
    document.querySelector(".cart-btn").style.display = "block";
    populateSummary();
  }

  if(currentStep > 1){
    document.querySelector(".prev-btn").style.display = "block";
  }
}

function prevStep() {
  if(currentStep > 1){
    document.getElementById("step"+currentStep).classList.remove("active-step");
    document.getElementById("s"+currentStep).classList.remove("active");

    currentStep--;

    document.getElementById("step"+currentStep).classList.add("active-step");
    document.getElementById("s"+currentStep).classList.add("active");
  }

  if(currentStep < 4){
    document.querySelector(".next-btn").style.display = "block";
    document.querySelector(".cart-btn").style.display = "none";
  }

  if(currentStep == 1){
    document.querySelector(".prev-btn").style.display = "none";
  }
}

function goToStep(stepNum) {
  if(stepNum >= 1 && stepNum <= 4) {
    document.getElementById("step"+currentStep).classList.remove("active-step");
    document.getElementById("s"+currentStep).classList.remove("active");

    currentStep = stepNum;

    document.getElementById("step"+currentStep).classList.add("active-step");
    document.getElementById("s"+currentStep).classList.add("active");

    if(currentStep == 4){
      document.querySelector(".next-btn").style.display = "none";
      document.querySelector(".cart-btn").style.display = "block";
      populateSummary();
    } else {
      document.querySelector(".next-btn").style.display = "block";
      document.querySelector(".cart-btn").style.display = "none";
    }

    if(currentStep == 1){
      document.querySelector(".prev-btn").style.display = "none";
    } else {
      document.querySelector(".prev-btn").style.display = "block";
    }
  }
}

function toggleAccessory(el, price = 0) {
  el.classList.toggle('selected');
  const symbol = el.querySelector('.accessory-symbol');
  if (el.classList.contains('selected')) {
    symbol.textContent = '−';
  } else {
    symbol.textContent = '+';
  }
  calculateTotal();
}

function selectOption(el, price = 0, image = null, group = '', multi = false) {
  const groupName = group || el.dataset.group || '';
  if (groupName) {
    el.dataset.group = groupName;
  }

  if (price !== null) {
    el.dataset.price = price;
  }

  if (multi) {
    el.classList.toggle('selected');
  } else if (groupName) {
    document.querySelectorAll(`.option-card[data-group="${groupName}"]`).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  } else {
    let parent = el.parentElement;
    let cards = parent.querySelectorAll('.option-card');
    cards.forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }

  if (!image) {
    let imgEl = el.querySelector('img');
    if (imgEl) {
      image = imgEl.src;
    }
  }

  if (image) {
    document.getElementById('bikeImage').src = image;
  }

  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  document.querySelectorAll('.option-card.selected[data-price]').forEach(card => {
    total += parseFloat(card.dataset.price) || 0;
  });

  document.getElementById('finalPrice').innerText = total.toLocaleString('en-IN');
  return total;
}

function populateSummary() {
  const summaryItems = document.getElementById('summaryItems');
  summaryItems.innerHTML = '';
  
  const items = document.querySelectorAll('.option-card.selected');
  
  items.forEach(item => {
    const name = item.querySelector('.model-name')?.innerText || 
                 item.querySelector('.accessory-name')?.innerText || 
                 item.querySelector('.battery-card')?.innerText || 
                 'Item';
    const price = parseFloat(item.dataset.price) || 0;
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'summary-item';
    itemDiv.innerHTML = `<span>${name}</span><span>₹${price.toLocaleString('en-IN')}</span>`;
    summaryItems.appendChild(itemDiv);
  });
}

function updatePrice(amount) {
  calculateTotal();
}