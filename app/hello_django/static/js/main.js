// JavaScript
fetch(`http://localhost:8000/` + 'article', {
  method: 'GET',
  headers: {}
})
.then((response) => {
  return response.json()
})
  .then((data) => {
    let cnt = document.createElement('div');
    cnt.classList.add('container');
    cnt.setAttribute('id', data['id'])
    cnt.innerHTML = `
        <div class="title margin-right-15">${data['title']}</div>
        <div class="text margin-right-15">${data['text']}</div>
        <div class="isFeature margin-right-15">${data['isFeatured']}</div>
        <button type="submit" class="btn-delete margin-right-15">Удалить</button>
        <button type="submit" class="btn-change margin-right-15">Изменить</button>
    `
})
