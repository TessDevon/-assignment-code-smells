/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
*/

function getTotalLength(lengths: number[]): number {

  return lengths.reduce((previusValue,currentValue) => {
    return previusValue + currentValue;
  });
}


/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
*/

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentGrade(student: Student): string {
  if(student.name==="Sebastian") {
    if(student.handedInOnTime) {
      student.passed = true;
      return "VG";
    }
  }
  student.passed = false;
  return "IG";
}


/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
*/

class Temp {
  constructor(public city: string, public timeOfMeasurement: Date, public highestTemperature: number) {}
}

function averageWeeklyTemperatureInStockholm(measurements: Temp[]) :number {
  let sumOfTemperatures = 0;
  const sevenDaysInMilliseconds = 604800000;                  //Dessa två konstanter med siffror är konstanta tal. Ska vara global med stora bokstäver och understreck om de används på fler ställe i koden.
  const numberOfDaysInAWeek = 7;                              //Men då de endast används i en funktion skrivs de ut med camelCase i funktionen.

  for (let i = 0; i < measurements.length; i++) {
    if (measurements[i].city === "Stockholm") {
      if (measurements[i].timeOfMeasurement.getTime() > Date.now() - sevenDaysInMilliseconds) {
        sumOfTemperatures += measurements[i].highestTemperature;
      }
    }
  }

  return sumOfTemperatures / numberOfDaysInAWeek;             
}


/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
*/

class Product {
  constructor(
  public name: string,
  public price: number,
  public amount: number, 
  public description: string,
  public image: string
  ) {}
}

function showProduct (product: Product, parent: HTMLElement) {
  const container = document.createElement("div");

  const title = document.createElement("h4");
  title.innerHTML = product.name;
  container.appendChild(title);

  const price = document.createElement("strong");
  price.innerHTML = product.price.toString();
  container.appendChild(price);

  const imageTag = document.createElement("img");
  imageTag.src = product.image;
  container.appendChild(imageTag);

  parent.appendChild(container);
}


/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function createStudent(student: Student): HTMLElement {
  const container = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = student.handedInOnTime;
  container.appendChild(checkbox);
  return container;
}

function presentStudents(students: Student[]) {
  for (const student of students) {
    const container = createStudent(student);
    
    if (student.handedInOnTime) {
      const listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      const listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}


/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
*/  

function concatenateStrings() :string {
  const texts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  
return texts.join('');
}


/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

  class User {
    constructor(
    public name: string,
    public birthday: Date,
    public email: string, 
    public password: string
    ) {}
  }

function createUser(user: User) {
  // Validation
  const BaseYearForEpoctime = 1970;       //Samma som ovan gällande magic number, en konstant som inte kommer förändras. Finns endast i denna function därav att den ligger kvar med camelCase. Annars skulle den legat globalt med stora bokstäver och understeck.
  const minimumUserAge = 20;                  

  const ageDiff = Date.now() - user.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - BaseYearForEpoctime );

  console.log(userAge);

  if (userAge >= minimumUserAge) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
