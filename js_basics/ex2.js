const sales="Toyata";
function carType(name){
    return name=="Honda"?name:"Sorry we don't sell this car";
}
const car={carr:"City",getCar:carType("Honda"),special:sales};
console.log(car.carr);
console.log(car.getCar);
console.log(car.special);