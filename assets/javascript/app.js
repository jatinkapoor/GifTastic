$(document).ready(function () {

  let animals = ['elephant', 'cat', 'dog', 'lion', 'bear', 'horse', 'beaver',
    'duck', 'deer', 'monkey', 'peacock', 'rabbit', 'cow', 'bull', 'pigeon', 
    'chicken', 'coyote', 'goat', 'stingray', 'sheep', 'zebra', 'mandrill',
    'jaguar', 'gorilla', 'goose', 'gorilla', 'kiwi', 'kingfisher',
    'mandrill', 'macaw', 'moose', 'porcupine', 'poodle', 'puffin', 'robin', 'squirrel', 'magpie',
    'olm'
  ];

  const renderer = function () {

    $('#button-loc').empty();

    for (let i = 0; i < animals.length; i++) {
      let animal = $('<button>').attr({
        class: 'gif-btn',
        type: 'button',
        value: `${animals[i].toLowerCase()}`
      }).text(`${animals[i].toLowerCase()}`);
      $('#button-loc').append(animal);
    }
  }

  const generateGif = function () {
    $('#gif-loc').empty();
    let value = $(this).attr('value');
    let address = "https://api.giphy.com/v1/gifs/search?q=";
    let api_key = "&api_key=K49b1wyxkVVa4Gh4Q5uKUOzpWuCQpl3b&limit=10";

    // // GET Request URL for GIFS
    let urlString = address + value + api_key
    // ajax call 
    $.ajax(url = urlString, method = 'GET').then(function (response) {
      console.log(response);
      for (let i = 0; i < 10; i++) {
        $('#gif-loc').append(`<p>Rating: ${(response.data[i].rating).toUpperCase()} <br><br> <img class="gif" data-gif_src="${response.data[i].images.downsized_medium.url}" src="${response.data[i].images.downsized_still.url}" alt=""></p>`);
      }
    });
  }

  $(document).on('click', 'button', generateGif)

  renderer();

  $('#search-btn').click(function (event) {
    event.preventDefault();
    animals.push($('#search-input').val().trim().toLowerCase());
    $('#search-input').val('');
    renderer();
  });

  $(document).on('mouseenter', '.gif', function () {
    $(this).data('img_src', $(this).attr('src'));
    $(this).attr('src', $(this).data('gif_src'));
  });

  $(document).on('mouseleave', '.gif', function () {
    $(this).attr('src', $(this).data('img_src'));
  });
});