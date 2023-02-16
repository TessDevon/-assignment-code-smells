/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/


export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      return sortListByPrice(copiedList).reverse();

    case Sort.PRICE_DECENDING:
      return sortListByPrice(copiedList);

    case Sort.NAME_ALPHABETIC:
      return sortListByName(copiedList);  

    case Sort.NAME_ALPHABETIC_REVERSE:
      return sortListByName(copiedList).reverse();  

    default: 
      return []; 
  }
}

function sortListByPrice(products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (p1.price < p2.price) {
      return 1;
    } else if (p1.price > p2.price) {
      return -1;
    }
    return 0;
  });
}

function sortListByName(products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (p1.name < p2.name) {
      return 1;
    } else if (p1.name > p2.name) {
      return -1;
    }
    return 0;
  });
}

//KLAR!


/*
  2. Refaktorera funktionen createProductHtml :)
   


class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }
  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });

    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "kriminella") {
      let cat2: HTMLElement = document.getElementById(
        "kriminella"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "singlar") {
      let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }
  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}
*/
/*
interface ICart {                    //NGT ÄR FEL!! constructor fattas OM det ska var en klass..
  addToCart(i: number) {}
}*/

class Cart {
  addToCart(i: number) {}
}

/*
interface IProduct {
  name: string;
  price: number;
  tax: number;
  imageUrl: string;
}*/


export const carts = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export const products = JSON.parse(localStorage.getItem("savedList") || "[]");

function updateValueOnFloatingcartnumber() {
  let quantity = 0;
  for (let i = 0; i < carts.length; i++) {
    quantity += carts[i].quantity;
  }
  const floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
}

export function createProductHtml() {
  for (let i = 0; i < products.length; i++) {
    const dogproduct: HTMLDivElement = document.createElement("div");
    const dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    const dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = products[i].picture;
    dogImg.alt = products[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    const cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    const cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    const name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    const price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + products[i].price;
    dogproduct.appendChild(price);

    const info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = products[i].info;
    dogproduct.appendChild(info);

    products[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      products[i].productSpec = !products[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      const listastext = JSON.stringify(products);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      const cart = new Cart();
      cart.addToCart(i);
    });

    if (products[i].category === "sassy") {
      const cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (products[i].category === "kriminella") {
      const cat2: HTMLElement = document.getElementById(
        "kriminella"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (products[i].category == "singlar") {
      const cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (products[i].category === "puppy") {
      const cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (products[i].category === "oldies") {
      const cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }
  const listastext = JSON.stringify(products);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
*/


export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
