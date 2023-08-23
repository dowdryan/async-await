let baseURL = 'https://deckofcardsapi.com/api/deck';

async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/?count=1`)
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
}
// part1()

async function part2() {
    let data = await $.getJSON(`${baseURL}/new/draw/?count=2`)
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`)
    console.log(`${data.cards[1].value} of ${data.cards[1].suit}`)
}
part2()

$(function() {
    async function setUp() {
        let $btn = $('button')
        let $cardArea = $('#card-area')
        let shuffledDeck = await $.getJSON(`${baseURL}/new/shuffle/`)
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${shuffledDeck.deck_id}/draw/`)
            // console.log(cardData)
            let cardImage = cardData.cards[0].image
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                  src: cardImage,
                  css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                  }
                })
              );
            if (cardData.remaining === 0) $btn.remove();
        })
    }
    setUp()
})