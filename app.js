
// Get references to HTML elements
const form = document.getElementById('form');
const genreInput = document.getElementById('genreInput');
const outputDiv = document.getElementById('output');

// Define event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const inputText = genreInput.value;
  const output = classify(inputText);

  // Display the output on the HTML page
  outputDiv.innerHTML = `The genre is ${JSON.stringify(output)}`;
});


const data = [  
    {    "id": 28,    "name": "Action",    "keywords": ["action", "fight", "explosion", "adventure"]
  },
  {
    "id": 12,
    "name": "Adventure",
    "keywords": ["adventure", "journey", "explore", "treasure"]
  },
  {
    "id": 16,
    "name": "Animation",
    "keywords": ["animation", "cartoon", "anime", "family"]
  },
  {
    "id": 35,
    "name": "Comedy",
    "keywords": ["comedy", "funny", "laugh", "humor"]
  },
  {
    "id": 80,
    "name": "Crime",
    "keywords": ["crime", "murder", "robbery", "detective"]
  },
  {
    "id": 99,
    "name": "Documentary",
    "keywords": ["documentary", "real-life", "true story", "history"]
  },
  {
    "id": 18,
    "name": "Drama",
    "keywords": ["drama", "emotional", "serious", "relationships"]
  },
  {
    "id": 10751,
    "name": "Family",
    "keywords": ["family", "kids", "children", "parents"]
  },
  {
    "id": 14,
    "name": "Fantasy",
    "keywords": ["fantasy", "magic", "mythical", "enchantment"]
  },
  {
    "id": 36,
    "name": "History",
    "keywords": ["history", "past", "period", "biography"]
  },
  {
    "id": 27,
    "name": "Horror",
    "keywords": ["horror", "fear", "terror", "scary"]
  },
  {
    "id": 10402,
    "name": "Music",
    "keywords": ["music", "concert", "performer", "band"]
  },
  {
    "id": 9648,
    "name": "Mystery",
    "keywords": ["mystery", "enigma", "puzzle", "clue"]
  },
  {
    "id": 10749,
    "name": "Romance",
    "keywords": ["romance", "love", "heart", "passion"]
  },
  {
    "id": 878,
    "name": "Science Fiction",
    "keywords": ["science fiction", "space", "aliens", "future"]
  },
  {
    "id": 10770,
    "name": "TV Movie",
    "keywords": ["tv movie", "made for tv", "television", "small screen"]
  },
  {
    "id": 53,
    "name": "Thriller",
    "keywords": ["thriller", "suspense", "tension", "excitement"]
  },
  {
    "id": 10752,
    "name": "War",
    "keywords": ["war", "battle", "soldier", "military"]
  },
  {
    "id": 37,
    "name": "Western",
    "keywords": ["western", "cowboy", "ranch", "frontier"]
  }
]

// function to classify the user's text
function classify(text) {
    //  an array of input objects based on the user's text
    const inputObjects = text.split(' ').map(word => {
      const input = {};
      input[word] = 1;
      return { input };
    });
    
    // classify each input object using the neural network
    const results = inputObjects.map(inputObject => {
      return net.run(inputObject.input);
    });
    
    // sum up the results
    const output = results.reduce((acc, val) => {
      for (const category in val) {
        acc[category] = (acc[category] || 0) + val[category];
      }
      return acc;
    }, {});
    
    // normalize the output by dividing each value by the total sum
    const sum = Object.values(output).reduce((acc, val) => acc + val, 0);
    for (const category in output) {
      output[category] /= sum;
    }
    
    // return the normalized output
    return output;
  }
  
  // create neural network
  const net = new brain.NeuralNetwork();
  
  // create training data
  const trainingData = [];
  data.forEach(category => {
    category.keywords.forEach(keyword => {
      const input = {};
      input[keyword] = 1;
      trainingData.push({
        input,
        output: { [category.name]: 1 }
      });
    });
  });
  
  // train neural network
  net.train(trainingData);

  const inputText = prompt('Enter a movie genre:');
  
//   // test the neural network with user input
//   const testPhrase = "a funny comedy movie";
//   const output = classify(testPhrase);
//   console.log(output);

//   const testPhrase2 = "a scary horror movie";
// const output2 = classify(testPhrase2);
// console.log(output2);


const output = net.run(inputText);
document.getElementById('output').innerHTML = `The genre is ${output}`;
console.log(output);


