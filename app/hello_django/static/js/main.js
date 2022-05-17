// JavaScript

function createRecord(id, title, text, isFeatured){
    let cnt = document.createElement('div');
    cnt.classList.add('container');
    cnt.setAttribute('id', id)
    cnt.innerHTML = `
                    <div class="title margin-right-15" id="title-${id}">${title}</div>
                    <div class="text margin-right-15" id="text-${id}">${text}</div>
                    <div class="isFeature margin-right-15" id="isf-${id}">${isFeatured}</div>
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

            let btns = document.querySelectorAll('.btn-change');
            btns.forEach(function (item){
                item.onclick = function (){
                    fetch(`http://localhost:8000/` + 'article', {
                        method: 'PATCH',
                        body: {
                            'title': document.querySelector('.input-title').value,
                            'text': document.querySelector('.input-text').value,
                            'isFeatured': document.querySelector('.input-isFeatured').value === 'true',
                            'id': parseInt(item.id.substring(4))
                        }
                    })
                        .then((response) => {
                            let id = parseInt(item.id.substring(4));
                            document.getElementById('title-' + id).innerHTML = document.querySelector('.input-title').value;
                            document.getElementById('text-' + id).innerHTML = document.querySelector('.input-text').value;
                            document.getElementById('isf-' + id).innerHTML = document.querySelector('.input-isFeatured').value;
                        })
                }
            })

            let btnsd = document.querySelectorAll('.btn-delete');
            btnsd.forEach(function (item){
                item.onclick = function (){
                    fetch(`http://localhost:8000/` + 'article', {
                        method: 'DELETE',
                        body: {
                            'id': parseInt(item.id.substring(4))
                        }
                    })
                        .then((response) => {
                            document.getElementById(item.id.substring(4)).remove();
                        })
                }
            })
        })
}

function createRecordPost(){
    let btn = document.querySelector('.btn-create');
    btn.onclick = function (){
        fetch(`http://localhost:8000/` + 'article', {
            method: 'POST',
            body: {
                'title': document.querySelector('.input-title').value,
                'text': document.querySelector('.input-text').value,
                'isFeatured': document.querySelector('.input-isFeatured').value === 'true',
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

getList();
createRecordPost();
