let PINFO;

let POKEMON_INFO = [];

$(() => {
    let POKEMON_DATA = [];
    
    PINFO = POKEMON_INFO;

    const promisePokemonData = $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon/',
        data: {
            "limit": 151,
        }
    });

    const promisePokemonInfo = (index) => $.ajax({
        url: POKEMON_DATA[index].url,
        data: {
            
        }
    });

    promisePokemonData.then(data => {
        let tempData = data;
        POKEMON_DATA = tempData.results;
        //console.log(POKEMON_DATA);
        for (let i = 0; i < POKEMON_DATA.length; i++) {
            promisePokemonInfo(i).then(data => {
                //console.log(data)
                //let tempData = data;
                //console.log(tempData);
                POKEMON_INFO.push(data);
                //console.log(POKEMON_INFO);
                
                return POKEMON_INFO;
            }).catch(error => {
                console.log('bad request', error);
            });
        }
    }).catch(error => {
        console.log('bad request', error);
    });

    
});

function getPokemonNamebyID(input){
    let a = POKEMON_INFO.find(item=> item.id === input);
    //console.log(input, a);
    return a.name;
}

function getPokemonSpritesbyID(input){
    let a = POKEMON_INFO.find(item=> item.id === input);
    //console.log(input, a);
    return a.sprites.front_default;
}

function getPokemonTypebyID(input){
    let a = POKEMON_INFO.find(item=> item.id === input);
    //console.log(input, a);
    return a.types;
}

function getPokemonWeightHeightbyID(input){
    let a = POKEMON_INFO.find(item=> item.id === input);
    //console.log(input, a);
    return {
        weight: a.weight,
        height: a.height
    }
}

function getPokemonObjbyID(input){
    let a = POKEMON_INFO.find(item=> item.id === input);
    //console.log(input, a);
    return a;
}

export default{
    sayHi(){
        console.log('hello world'); 
    },
    PINFO,
    getPokemonNamebyID,
    getPokemonSpritesbyID,
    getPokemonTypebyID,
    getPokemonWeightHeightbyID,
    getPokemonObjbyID,


}