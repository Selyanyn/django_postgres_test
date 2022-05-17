// JavaScript

function createRecord(id, title, text, isFeatured){
    let cnt = document.createElement('div');
    cnt.classList.add('container');
    cnt.setAttribute('id', id)
    cnt.innerHTML = `
                    <div class="title margin-right-15">${title}</div>
                    <div class="text margin-right-15">${text}</div>
                    <div class="isFeature margin-right-15">${isFeatured}</div>
                    <button type="submit" class="btn-delete margin-right-15" id="del-${id}">Удалить</button>
                    <button type="submit" class="btn-change margin-right-15" id="chg-${id}">Изменить</button>
    `
    return cnt;
}

function getList() {
    fetch(`http://localhost:8000/` + 'article', {
        method: 'GET',
        headers: {}
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            for (let k in data) {
                document.body.append(createRecord(k, data[k]['title'], data[k]['text'], data[k]['isFeatured']))
            }

            let i = {
                "1": {
                    'title': "her",
                    'text': 'her',
                    'is': true
                },
                "2": {
                    'title': "her",
                    'text': 'her',
                    'is': true
                }
            }
        })
}

function createRecord(){
    let btn = document.querySelector('.btn-create');
    btn.onclick = function (){
        fetch(`http://localhost:8000/` + 'article', {
            method: 'POST',
            body: {
                'title': document.querySelector('input-title').value,
                'text': document.querySelector('input-text').value,
                'isFeatured': document.querySelector('input-isFeatured').value === 'true',
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            for (let k in data) {
                document.body.append(createRecord(k, data[k]['title'], data[k]['text'], data[k]['isFeatured']))
            }
        })
    }
}

function patchRecord(){

}
getList();
createRecord();
