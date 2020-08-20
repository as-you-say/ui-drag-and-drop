// 드래그 이벤트
var cardList = document.querySelectorAll('.card');
var size = cardList.length;
var onDragEnd = function(e1){
    // 기본
    var dom = document.createElement('div');
    dom.className = 'card block';
    dom.draggable = true;
    dom.style['z-index'] = 2;
    
    var label = e1.currentTarget.attributes['data-name'].value;
    dom.innerHTML = '<div class="label">'+label+'</div>';

    // 이동
    dom.style.left = (e1.x-50) + 'px';
    dom.style.top = (e1.y-50) + 'px';

    // 우측 빈칸
    var empty = document.createElement('div');
    empty.className = 'empty';
    dom.appendChild(empty);

    // 이동 이벤트
    dom.addEventListener('dragend', function(e2){
        dom.style.left = (e2.x-50) + 'px';
        dom.style.top = (e2.y-50) + 'px';
    })

    // 드랍 후 붙이기
    document.querySelector('#canvas').appendChild(dom);
}

// 드래그 이벤트
for(var i=0; i<size; i++){
    cardList[i].addEventListener('dragend', onDragEnd)
}

// 빈 상자에 드래그오버
// 빈 상자에 드랍