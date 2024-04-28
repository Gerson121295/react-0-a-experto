


//Arreglos [] - en JS

//Forma 1 de crear arreglo - No recomendable porque tiene tamaño
const arreglo = new Array(100); //el arreglo tengra un tamaño de 100
arreglo.push(1); //agrega una cantida al arreglo ahora sera de 101
console.log(arreglo);

//Forma 2 de crear arreglo 
console.log("--------Crear arreglo sin tamaño definido --");
const arreglo1 = [];
arreglo1.push(1); //insertar al arreglo el 1  - no es recomendable usar push para agregar datos al arreglo
arreglo1.push(2); 
console.log(arreglo1);

//Forma 3 crear arreglo
let arreglo2 = [1,2,3,4]
console.log(arreglo2);

console.log("4 - Crear arreglo y agregar datos de arreglo2 mas asigna nuevos datos");
let arreglo3 = [...arreglo2, 5]; //crea clon(con spread) del arreglo2 en arreglo3 y le agrega un nuevo dato 5
console.log(arreglo3);

console.log("*-------------------*");
//"Utiliando el map (crear un nuevo arreglo el cual se modifica pero no modifica el arreglo que se le envia)");
const arreglo4 = arreglo3.map(function(number){ //callback esta funcion recibe un number y se ejecutará por cada elemento del arreglo3
    return number + 2; //cada elemento del arreglo3 se sumara 2
});
console.log("arreglo3 no modificado: " + arreglo3);
console.log("arreglo4 map modificado: " + arreglo4);


