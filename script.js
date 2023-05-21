document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form input values
    const quantityA = parseInt(document.getElementById('quantity-a').value);
    const quantityB = parseInt(document.getElementById('quantity-b').value);
    const quantityC = parseInt(document.getElementById('quantity-c').value);
    const giftWrapA = document.getElementById('gift-wrap-a').checked;
    const giftWrapB = document.getElementById('gift-wrap-b').checked;
    const giftWrapC = document.getElementById('gift-wrap-c').checked;
  
    // Calculate cart details
    const cartDetails = [
      { name: 'Product A', quantity: quantityA, price: 20, giftWrap: giftWrapA },
      { name: 'Product B', quantity: quantityB, price: 40, giftWrap: giftWrapB },
      { name: 'Product C', quantity: quantityC, price: 50, giftWrap: giftWrapC }
    ];
  
    const subtotal = cartDetails.reduce((total, item) => total + (item.quantity * item.price), 0);
    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    
    // Apply discount rules
    let discountName = '';
    let discountAmount = 0;
  
    if (subtotal > 200) {
      discountName = 'flat_10_discount';
      discountAmount = 10;
    } else if (quantityA > 10 || quantityB > 10 || quantityC > 10) {
      discountName = 'bulk_5_discount';
      discountAmount = 0.05;
    } else if (totalQuantity > 20) {
      discountName = 'bulk_10_discount';
      discountAmount = 0.10;
    } else if (totalQuantity > 30 && (quantityA > 15 || quantityB > 15 || quantityC > 15)) {
      discountName = 'tiered_50_discount';
      discountAmount = 0.50;
    }
  
    const discount = subtotal * discountAmount;
    const shippingFee = Math.ceil(totalQuantity / 10) * 5;
    const giftWrapFee = cartDetails.reduce((total, item) => item.giftWrap ? total + item.quantity : total, 0);
  
    const total = subtotal - discount + shippingFee + giftWrapFee;
  
    // Display cart details
    const cartDetailsElement = document.getElementById('cart-details');
    cartDetailsElement.innerHTML = '';
  
    cartDetails.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.quantity * item.price}</td>
      `;
      cartDetailsElement.appendChild(row);
    });
  
    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal}`;
    document.getElementById('discount').textContent = `Discount (${discountName}): $${discount}`;
    document.getElementById('shipping-fee').textContent = `Shipping Fee: $${shippingFee}`;
    document.getElementById('gift-wrap-fee').textContent = `Gift Wrap Fee: $${giftWrapFee}`;
    document.getElementById('total').textContent = `Total: $${total}`;
  
    document.getElementById('result').classList.remove('hidden');
  });
  