let baseURL = 'http://numbersapi.com'
let num1 = Math.floor(Math.random() * 100) + 1
let num2 = Math.floor(Math.random() * 100) + 1
let num3 = Math.floor(Math.random() * 100) + 1
const numbers = [num1, num2, num3]

// while (num2 === num1) num2 = Math.floor(Math.random() * 100) + 1
// while (num3 === num3 || num3 === num1) num3 = Math.floor(Math.random() * 100) + 1

async function part1() {
    let data = await $.getJSON(`${baseURL}/${num1}?json`)
    console.log(data)
    console.log(`Data Found: ${data.found}`)
    console.log(`Number: ${data.number}`)
    console.log(data.text)
    console.log(`Type: ${data.type}`)
}
part1()

async function part2() {
    let data = await $.getJSON(`${baseURL}/${numbers}?json`)
    console.log(data)
}
part2()

async function part3() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${num1}?json`))
      );
      facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
      });
      console.log(facts)
}
part3()

