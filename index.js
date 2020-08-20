// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}

// 드래그 이벤트
var cardList = document.querySelectorAll('.card');
var size = cardList.length;
var onDragEnd = function(e1){
    // 기본
    var dom = document.createElement('div');
    dom.className = 'card block';
    dom.style['z-index'] = 2;
    dom.draggable = true;
    
    var label = document.createElement('div');
    label.className = 'label';
    label.innerHTML = e1.currentTarget.attributes['data-name'].value;
    // label.draggable = true;
    dom.appendChild(label);
    
    // 이동
    dom.style.left = (e1.x-50) + 'px';
    dom.style.top = (e1.y-50) + 'px';

    // 우측 빈칸
    var empty = document.createElement('div');
    empty.className = 'empty';

    // 삭제
    empty.addEventListener('click', function(){
      dom.remove();
    })
    empty.addEventListener('mouseover', function(){
      empty.style.opacity = 1;
      empty.style.backgroundColor = '#234123';
    })
    empty.addEventListener('mouseleave', function(){
      empty.style.opacity = 0.1;
      empty.style.backgroundColor = '#fff';
    })

    // 근처로 드래그 했을때
    empty.addEventListener('dragenter', function(){
      empty.style.opacity = 1;
      empty.style.backgroundColor = '#234123';
    })
    empty.addEventListener('dragleave', function(){
      empty.style.opacity = 0.1;
      empty.style.backgroundColor = '#fff';
    })
    empty.addEventListener('drop', function(e2){
      console.log(e2)
    })

    dom.appendChild(empty);

    // 이동 이벤트
    dom.addEventListener('dragend', function(e2){
        dom.style.left = (e2.x-50) + 'px';
        dom.style.top = (e2.y-50) + 'px';
    })
    label.addEventListener('drag', function(e2){
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