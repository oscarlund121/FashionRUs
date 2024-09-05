/** @format */
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
let url = "https://kea-alt-del.dk/t7/api/products?category=" + category;

/* fetch("https://kea-alt-del.dk/t7/api/products?brandname=Nike") */
/* fetch("https://kea-alt-del.dk/t7/api/products?limit=10") */
/* fetch("https://kea-alt-del.dk/t7/api/products?limit=100") */
fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  /* fetch("https://kea-alt-del.dk/t7/api/products?limit=10&brandname=Nike") */
  /* fetch("https://kea-alt-del.dk/t7/api/products?season=Summer") */
  /* fetch("https://kea-alt-del.dk/t7/api/products?limit=20&season=Spring") */
  /* fetch("https://kea-alt-del.dk/t7/api/products?limit=20&season=Fall") */
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  // looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  // fang template
  const template = document.querySelector("#smallProductTemplate").content;
  // lav en kopi
  const copy = template.cloneNode(true);
  // ændre indhold
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".price").textContent = product.price;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  if (product.soldout) {
    // Produktet er udsolgt
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    // Produktet er udsolgt
    copy.querySelector("article").classList.add("onSale");
  }
  copy.querySelector(".discounted p span").textContent = Math.round(
    product.price - (product.price * product.discount) / 100
  );
  copy.querySelector(".discounted p+p span").textContent = product.discount;
  copy
    .querySelector(".buy-now")
    .setAttribute("href", `produkt.html?id=${product.id}`);

  // appende
  document.querySelector(".container").appendChild(copy);
}

/*
{
  "id": 1525,
  "gender": "Unisex",
  "category": "Accessories",
  "subcategory": "Bags",
  "articletype": "Backpacks",
  "basecolour": "Navy Blue",
  "season": "Fall",
  "productionyear": 2010,
  "usagetype": "Casual",
  "productdisplayname": "Deck Navy Blue Backpack",
  "parsed": 1,
  "soldout": 0,
  "relid": 1525,
  "price": 1299,
  "discount": 55,
  "variantname": "Deck Backpack",
  "brandname": "Puma",
  "brandbio": "PUMA is the World's Fastest Sports Brand",
  "brandimage": "http://assets.myntassets.com/assets/images/2015/11/17/11447736932686-113016-3ff8sf.jpg",
  "agegroup": "Adults-Unisex",
  "colour1": "NA",
  "colour2": "NA",
  "fashiontype": "Fashion",
  "materialcaredesc": null,
  "sizefitdesc": null,
  "description": "<p>asfafaf<br> kasjhdkashd</p>",
  "styledesc": null
}*/
