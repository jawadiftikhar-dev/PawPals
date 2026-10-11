export function productsPage() {
  // Return the shell immediately, then hydrate with data
  setTimeout(loadProducts, 0);

  return `
    <section class="page">
      <h1>Pet Products</h1>
      <p>Browse our recommended products. This list works offline after your first visit.</p>
      <div id="products-status">Loading products…</div>
      <ul id="products-list" class="service-list"></ul>
    </section>
  `;
}

async function loadProducts() {
  const status = document.getElementById('products-status');
  const list = document.getElementById('products-list');
  if (!status || !list) return;

  try {
    const res = await fetch('https://dummyjson.com/products?limit=6');
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();

    status.textContent = '';
    list.innerHTML = data.products
      .map(
        (p) => `
        <li>
          <h2>${p.title}</h2>
          <p>${p.description?.slice(0, 80) ?? ''}…</p>
        </li>
      `
      )
      .join('');
  } catch (err) {
    status.innerHTML = `
      <p style="color:#b3261e">
        Couldn't load products. You may be offline and this data hasn't been cached yet.
      </p>
    `;
    console.error(err);
  }
}