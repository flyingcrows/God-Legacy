/* ZAVO Shopify-powered storefront. Tokenless Storefront API is used for public catalogue/cart access. */
(() => {
  "use strict";
  const SHOP_DOMAIN = "hujnfh-bk.myshopify.com";
  const API_VERSION = "2026-10";
  const API_URL = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;
  const $ = (id) => document.getElementById(id);
  const money = (amount, currency) => new Intl.NumberFormat("en-IN", {style:"currency",currency:currency || "INR",maximumFractionDigits:2}).format(Number(amount || 0));
  const state = {products:[], cart:loadCart()};
  function loadCart(){try{return JSON.parse(localStorage.getItem("zavo-cart") || "[]")}catch{return []}}
  function saveCart(){localStorage.setItem("zavo-cart",JSON.stringify(state.cart));renderCart()}
  async function shopify(query,variables={}) {
    const response = await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query,variables})});
    if(!response.ok) throw new Error("Shopify request failed ("+response.status+").");
    const payload = await response.json();
    if(payload.errors?.length) throw new Error(payload.errors.map(e=>e.message).join("; "));
    return payload.data;
  }
  const PRODUCTS_QUERY = `query ZavoProducts {
    products(first: 16, sortKey: BEST_SELLING) {
      nodes {
        id title handle description
        featuredImage { url altText }
        availableForSale
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 10) { nodes { id title availableForSale price { amount currencyCode } } }
      }
    }
  }`;
  function renderProducts(){
    const grid=$("productGrid");
    if(!state.products.length){grid.innerHTML='<div class="catalogue-state"><strong>Our first collection is being prepared.</strong><br>We are checking product quality, stock and delivery before making items available. Please check back soon.</div>';return}
    grid.innerHTML=state.products.map((p)=>{
      const variant=p.variants.nodes.find(v=>v.availableForSale);
      const image=p.featuredImage?.url || "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=85";
      const price=p.priceRange.minVariantPrice;
      const desc=(p.description || "").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().slice(0,110);
      return `<article class="product-card">
        <a href="https://${SHOP_DOMAIN}/products/${encodeURIComponent(p.handle)}" target="_blank" rel="noopener" class="product-photo"><img src="${image}" alt="${(p.featuredImage?.altText || p.title).replace(/"/g,"&quot;")}" loading="lazy"></a>
        <div class="product-info"><small>ZAVO / SELECTED FIND</small><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(desc)}</p><div class="product-price">${money(price.amount,price.currencyCode)}</div>
        <button class="add-cart" data-product="${p.id}" ${variant?"":"disabled"}>${variant?"ADD TO CART":"CURRENTLY UNAVAILABLE"}</button></div>
      </article>`;
    }).join("");
    grid.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>addToCart(button.dataset.product)));
  }
  function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function addToCart(productId){
    const p=state.products.find(x=>x.id===productId);const variant=p?.variants.nodes.find(v=>v.availableForSale);if(!variant)return;
    const line=state.cart.find(x=>x.variantId===variant.id);
    if(line)line.quantity=Math.min(10,line.quantity+1);else state.cart.push({variantId:variant.id,productId:p.id,title:p.title,variantTitle:variant.title,price:variant.price.amount,currency:variant.price.currencyCode,image:p.featuredImage?.url || "",quantity:1});
    saveCart();openCart();
  }
  function renderCart(){
    $("cartCount").textContent=state.cart.reduce((n,x)=>n+x.quantity,0);
    $("cartItems").innerHTML=state.cart.length?state.cart.map((x,i)=>`<div class="cart-line"><img src="${x.image}" alt=""><div><h3>${escapeHtml(x.title)}</h3><small>${escapeHtml(x.variantTitle)} · ${money(x.price,x.currency)}</small><div class="cart-qty"><button data-qty="-1" data-index="${i}" aria-label="Decrease quantity">−</button><span>${x.quantity}</span><button data-qty="1" data-index="${i}" aria-label="Increase quantity">+</button></div></div><button class="cart-remove" data-remove="${i}">Remove</button></div>`).join(""):'<p class="cart-empty">Your cart is waiting for a good find.</p>';
    $("cartItems").querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>{const i=Number(b.dataset.index);state.cart[i].quantity+=Number(b.dataset.qty);if(state.cart[i].quantity<1)state.cart.splice(i,1);if(state.cart[i]?.quantity>10)state.cart[i].quantity=10;saveCart()}));
    $("cartItems").querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{state.cart.splice(Number(b.dataset.remove),1);saveCart()}));
    const subtotal=state.cart.reduce((n,x)=>n+Number(x.price)*x.quantity,0);$("cartSubtotal").textContent=state.cart.length?money(subtotal,state.cart[0].currency):money(0,"INR");
    $("checkoutButton").disabled=!state.cart.length;
  }
  function openCart(){$("cartDrawer").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");$("cartOverlay").hidden=false;document.body.style.overflow="hidden"}
  function closeCart(){$("cartDrawer").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");$("cartOverlay").hidden=true;document.body.style.overflow=""}
  async function checkout(){
    const button=$("checkoutButton"),status=$("checkoutStatus");button.disabled=true;status.textContent="Preparing secure Shopify checkout…";
    try{
      const lines=state.cart.map(x=>({merchandiseId:x.variantId,quantity:x.quantity}));
      const data=await shopify(`mutation ZavoCreateCart($lines:[CartLineInput!]!){cartCreate(input:{lines:$lines}){cart{id checkoutUrl} userErrors{field message}}}`,{lines});
      const result=data.cartCreate;if(result.userErrors.length)throw new Error(result.userErrors.map(e=>e.message).join("; "));
      if(!result.cart?.checkoutUrl)throw new Error("Shopify did not return a checkout link.");
      window.location.assign(result.cart.checkoutUrl);
    }catch(error){status.textContent="Checkout is not ready: "+error.message;button.disabled=false}
  }
  async function init(){
    $("year").textContent=new Date().getFullYear();
    $("cartOpen").addEventListener("click",e=>{e.preventDefault();openCart()});
    $("cartClose").addEventListener("click",closeCart);$("cartOverlay").addEventListener("click",closeCart);$("checkoutButton").addEventListener("click",checkout);
    const form=$("searchForm"),input=$("searchInput");
    form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim().toLowerCase();document.querySelectorAll(".product-card").forEach(card=>card.style.display=card.innerText.toLowerCase().includes(q)?"":"none");$("the-edit").scrollIntoView({behavior:"smooth"})});
    renderCart();
    try{const data=await shopify(PRODUCTS_QUERY);state.products=data.products.nodes.filter(p=>p.availableForSale);renderProducts()}
    catch(error){$("productGrid").innerHTML='<div class="catalogue-state">We could not load the live collection right now. Please refresh in a moment. <span style="display:block;margin-top:6px;font-size:10px">'+escapeHtml(error.message)+'</span></div>'}
  }
  document.addEventListener("DOMContentLoaded",init);
})();