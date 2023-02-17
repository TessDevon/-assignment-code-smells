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



/*
  2. Refaktorera funktionen createProductHtml :)
*/

class Cart {
  addToCart(i: number) {}
}

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
  updateValueOnFloatingcartnumber();

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
    name.innerHTML = products[i].name;
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

    const productCategorys: string [] = [
      "sassy",
      "kriminella",
      "singlar",
      "puppy",
      "oldies"
    ];

    for(const productCategory of productCategorys) {
      if (products[i].category === productCategory) {
        const cat: HTMLElement = document.getElementById(productCategory) as HTMLElement;
        dogproduct.className = "dogproduct";
        cat.appendChild(dogproduct);
      }
    }
  }

  const listastext = JSON.stringify(products);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}



/*
  3. Refaktorera funktionen getfromstorage
*/

export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getDatafromstorageAndUpdateDOM() {
  const cartPruducts: CartProduct[] = JSON.parse(
    localStorage.getItem("cartArray") || ""
  )

  const amountcontainer = document.getElementById("amount-checkout-container2") as HTMLDivElement;       
  const amounttext: HTMLTableCellElement = document.createElement("th");        
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";
  const titlecontainer = document.getElementById("title-container") as HTMLTableRowElement;               
  titlecontainer.innerHTML = "<strong>products:</strong>";
  const productquantity = document.getElementById("product-quantity") as HTMLTableRowElement;             
  const qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";
  const checkkouttotal2 = document.getElementById("title-total") as HTMLTableCellElement;                  
  const totaltext: HTMLTableCellElement = document.createElement("th");
  totaltext.innerHTML = "total:";
  checkkouttotal2.appendChild(totaltext);

  for (let i = 0; i < cartPruducts.length; i++) {
    const productt: HTMLTableCellElement = document.createElement("th");                                  
    productt.innerHTML = cartPruducts[i].name;
    productt.className = "hej";
    titlecontainer.appendChild(productt);

    const amountt: HTMLTableCellElement = document.createElement("th");                                   
    amountt.innerHTML = "x" + cartPruducts[i].amount;
    amountt.className = "hej";
    amountcontainer.appendChild(amountt);

    const amountqt: HTMLTableCellElement = document.createElement("th");                                 
    amountqt.className = "hej";                                                   // Klassnamn hej hade jag ändrat namn på men då detta hade påverkat CSSen, då namnen ej längre matchar vilket leder till ändrad funktionalitet, så skriver jag det som en kommentar istället. 
    productquantity.appendChild(amountqt);

    const amountplusbtn: HTMLButtonElement = document.createElement("button");                            
    amountplusbtn.className = "plusbtn";
    const plusButtonIcon: HTMLSpanElement = document.createElement("i");
    plusButtonIcon.className = "fas fa-minus";
    amountplusbtn.appendChild(plusButtonIcon);
    amountqt.appendChild(amountplusbtn);

    const amountminusbtn: HTMLButtonElement = document.createElement("button");                         
    amountminusbtn.className = "minusbtn";
    const minusButtonIcon: HTMLSpanElement = document.createElement("i");
    minusButtonIcon.className = "fas fa-plus";
    amountminusbtn.appendChild(minusButtonIcon);
    amountqt.appendChild(amountminusbtn);
  }

  let addition = 0;                                                                            

  for (let i = 0; i < cartPruducts.length; i++) {
    addition += cartPruducts[i].price *= cartPruducts[i].amount;
  }

  const totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
