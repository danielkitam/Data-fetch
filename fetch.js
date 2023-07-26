const listOfElements = document.querySelector('.blog-post');
const postTemplate = document.getElementById('template-post');
const searchButton = document.getElementById('search');
const userInput = document.getElementById('user-input');

function request(userInput) {
  const url = `http://localhost:8000/${userInput.value}`;

  fetch(url)
    .then(response => {
      if(!response.ok) throw Error('Could not fetch data, check out your database');
      return response.json();
    })
    .then(data => {
      for(const post of data){
        const postContent = document.importNode(postTemplate.content, true);

        postContent.querySelector('h2').textContent = post.title.toUpperCase();
        postContent.querySelector('p').textContent = post.body;
        postContent.querySelector('img').src = post.image_url;
        postContent.querySelector('strong').textContent = `By ${post.author}`;
        postContent.querySelector('a').href = post.link;

        listOfElements.append(postContent);
      }
    })
    .then(listOfElements.innerHTML = '')
    .catch(error => console.log(error.message));
}

searchButton.addEventListener('click', () => {
  request(userInput);
});










