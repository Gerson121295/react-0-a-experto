// Import, export y funciones comunes en arreglos
//Esta data sera exportada e importada en archivos para su uso

//export const heroes = [ //Forma 1
//export default [ //forma 2 de exportar
const heroes = [ //forma 3 de exportar recomendada definir hasta abajo: export default heroes;.

    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];

const owners = ['DC', 'Marvel'] //exportar el arreglo owners con forma 4

//Forma 3 de exportar
//export const owners = ['DC', 'Marvel'] //exportar el arreglo owners
//export default heroes; //para definir que el arreglo heroes se exportará por defecto

//Forma 4 de exportar todo 
export{
    heroes as default, //definir un arreglo que será exportado por defecto. //heroes, //sin definir por defecto
    owners
}

