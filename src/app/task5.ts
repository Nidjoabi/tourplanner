// Task 5
// Discriminated unions make it easy to handle all transport types safely.
// If we add a new transport later, TypeScript forces us to update this switch.

type Car = {
  kind: "car";
  name: string;
  fuelLPer100km: number;
};

type Bike = {
  kind: "bike";
  name: string;
  effortLevel: "easy" | "medium" | "hard";
};

type Train = {
  kind: "train";
  name: string;
  line: string;
};

type Transport = Car | Bike | Train;

function transportLabel(t: Transport): string {
  switch (t.kind) {
    case "car":
      return `${t.name} (car, ${t.fuelLPer100km} L/100km)`;
    case "bike":
      return `${t.name} (bike, effort: ${t.effortLevel})`;
    case "train":
      return `${t.name} (train, line: ${t.line})`;
    default: {
      const _never: never = t;
      return _never;
    }
  }
}

const a: Transport = { 
    kind: "car", 
    name: "Rental Car", 
    fuelLPer100km: 6.7 
};

const b: Transport = { 
    kind: "bike", 
    name: "City Bike", 
    effortLevel: "medium" 
};

const c: Transport = { 
    kind: "train", 
    name: "S-Bahn", 
    line: "S 45" 
};

console.log(transportLabel(a));
console.log(transportLabel(b));
console.log(transportLabel(c));