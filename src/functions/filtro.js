const api_pessoas_url = "https://masterdataapi.nobelprize.org/2.1/laureates?offset=0&limit=2000";
const api_premios_url = "https://masterdataapi.nobelprize.org/2.1/nobelPrizes?offset=0&limit=1000";

//função pra checar a api função exemplo
async function getapi(url){
    const response = await fetch(url);

    var data = await response.json();
        console.log(data);
}

async function filterByCategory(category){
    const response = await fetch(api_premios_url);
    var data = await response.json();
        for(r in data.nobelPrizes){
            if(data.nobelPrizes[r].category.en == category){
                //data.nobelPrizes[r] contém todos os nobéis dessa categoria
                console.log(data.nobelPrizes[r])
            }
        }
}

async function filterByYear(year){
    const response = await fetch(api_premios_url);
    var data = await response.json();
        for(r in data.nobelPrizes){
            if(data.nobelPrizes[r].awardYear == year){
                //data.nobelPrizes[r] contém todos os nobéis desse ano
                console.log(data.nobelPrizes[r])
            }
        }
}

async function filterByCountry(country){
    const response = await fetch(api_pessoas_url);
    var data = await response.json();
        for(r in data.laureates){
            try {
                if(data.laureates[r].birth.place.country.en == country){
                    //data.laureates[r] contém todos os laureados desse País
                    console.log(data.laureates[r])
                }
            } catch (error) {
                
            }
                
        }
    }

//WIP vvv

async function filterMulti(country, year, category){
    const response = await fetch(api_premios_url);
    var data = await response.json();

    if(country == "null"){// caso ano-categoria
        for(r in data.nobelPrizes){
            if(data.nobelPrizes[r].awardYear == year && data.nobelPrizes[r].category.en == category){
                //data.nobelPrizes[r] contém todos os nobéis desse ano e categoria
                console.log(data.nobelPrizes[r])
            }
        }
    }
    if(year == "null"){// caso país-categoria
        for(r in data.nobelPrizes){
            if(data.nobelPrizes[r].category.en == category){
                //data.nobelPrizes[r] contém todos os nobéis desse ano e categoria
                console.log(data.nobelPrizes[r])
            }
        }
    }
}
