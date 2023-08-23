$(function() {
    // Although there are more pokemon out now, the API only has up to 1008.
    numOfPokemon = 1008
    const baseURL = 'https://pokeapi.co/api/v2'
    

    async function part1() {
        let pokemonList = []
        let allPokemon = await $.getJSON(`${baseURL}/pokemon?limit=${numOfPokemon}`)
        for (let i = 0; i < allPokemon.results.length; i++) {
            pokemonList.push(allPokemon.results[i].name)
        }
        console.log(pokemonList)
    }
    part1()
    

    async function part2() {
        let pokemonList = []
        let allPokemon = await $.getJSON(`${baseURL}/pokemon?limit=${numOfPokemon}`)
        for (let i = 0; i < allPokemon.results.length; i++) {
            // pokemonList.push(allPokemon.results[i].name)
            pokemonList.push({
              name: allPokemon.results[i].name,
              url: allPokemon.results[i].url
            })
        }
        let randomIDs = [
          Math.floor(Math.random() * pokemonList.length),
          Math.floor(Math.random() * pokemonList.length),
          Math.floor(Math.random() * pokemonList.length)
        ];
        for (let i = 0; i < randomIDs.length; i++) {
          console.log(pokemonList[randomIDs[i]].name);
          console.log(pokemonList[randomIDs[i]].url);
        }
        console.log(pokemonList)
    }
    part2()
    

    async function part3() {
      let pokemonList = []
      let allPokemon = await $.getJSON(`${baseURL}/pokemon?limit=${numOfPokemon}`)
      for (let i = 0; i < allPokemon.results.length; i++) {
          // pokemonList.push(allPokemon.results[i].name)
          pokemonList.push({
            name: allPokemon.results[i].name,
            url: allPokemon.results[i].url
          })
      }
      let randomIDs = [
        Math.floor(Math.random() * pokemonList.length),
        Math.floor(Math.random() * pokemonList.length),
        Math.floor(Math.random() * pokemonList.length)
      ];
      for (let i = 0; i < randomIDs.length; i++) {
        let pokemonData = await $.getJSON(pokemonList[randomIDs[i]].url)
        let speciesURL = pokemonData.species.url
        let speciesData = await $.getJSON(speciesURL)
        let englishDescription = speciesData.flavor_text_entries.find(entry => entry.language.name === "en")
        if (englishDescription) {
          console.log(`${pokemonList[randomIDs[i]].name}: ${englishDescription.flavor_text}`);
        } else {
          console.log(`${pokemonList[randomIDs[i]].name}: No English description available.`);
        }
      }
    }
    part3()
    

    let $btn = $("button");
    let $pokeArea = $("#pokemon-area");
    $btn.on("click", async function() {
      $pokeArea.empty();
      let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find(function(entry) {
          return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].name;
        let imgSrc = pokemonData[i].sprites.front_default;
        $pokeArea.append(makePokeCard(name, imgSrc, description));
      });
    });
  
    function makePokeCard(name, imgSrc, description) {
      return `
        <div class="card">
          <h1>${name}</h1>
          <img src=${imgSrc} />
          <p>${description}</p>
        </div>
      `;
    }
})