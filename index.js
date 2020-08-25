// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}

// 샘플 데이터 API 정보
var dataList = [
  {type:'GET', url:'https://naver.com', name:'Data 1'},
  {type:'GET', url:'https://naver.com', name:'Data 2'},
  {type:'GET', url:'https://naver.com', name:'Data 3'}
]

// 샘플 엔진 API 정보
var engineList = [
  {type:'POST', url:'https://google.com', name:'Engine 1'},
  {type:'POST', url:'https://google.com', name:'Engine 2'},
  {type:'POST', url:'https://google.com', name:'Engine 3'}
]

var Drag = function(workspace){
  var workspace = document.querySelector('#'+workspace);
  workspace.style.position = 'relative';

  var dl = workspace.getBoundingClientRect().left;
  var dt = workspace.getBoundingClientRect().top;

  var blockIdx = 0;
  var blockList = [
    {id: '', left: 0, top: 0, label: ''},
    {id: '', left: 0, top: 0, label: ''},
    {id: '', left: 0, top: 0, label: ''}
  ];
  var lineIdx = 0;
  var lineList = [
    {id: '', x1: 0, y1: 0, x2: 0, y2: 0},
    {id: '', x1: 0, y1: 0, x2: 0, y2: 0},
    {id: '', x1: 0, y1: 0, x2: 0, y2: 0}
  ];
  var connectIdx = 0;
  var connectList = [
    {id: '', startBlock: {}, line: {}, endBlock: {}},
    {id: '', startBlock: {}, line: {}, endBlock: {}},
    {id: '', startBlock: {}, line: {}, endBlock: {}}
  ];

  function addBlock(left, top, label){
    blockList.push({left:left, top:top, label:label});
  }

  function removeBlock(id){
    blockList.filter(function(o, i){
      if(o.id === id) {
        blockList.slice(i, 1);
      }
    })
  }

  function addLine(x1, y1, x2, y2){
    lineList.push({x1:x1, y1:y1, x2:x2, y2:y2});
  }

  function removeLine(id){
    lineList.filter(function(o, i){
      if(o.id === id) {
        lineList.slice(i, 1);
      }
    })
  }
  
  function addConnect(startBlock, endBlock, line){
    connectList.push({startBlock:startBlock, endBlock:endBlock, line:line})
  }

  function removeConnect(id){
    connectList.filter(function(o, i){
      if(o.id === id) {
        connectList.slice(i, 1);
      }
    })
  }

  this.Block = function(innerHTML) {
    var block = document.createElement('div');
    block.id = 'block-' + (blockIdx++);
    block.style.cursor = 'move';
    block.style.position = 'relative';
    block.innerHTML = innerHTML || '';

    function move(x, y){
      block.style.left = x + 'px';
      block.style.top = y + 'px';
    }

    function onDrag(e){
      var x = e.pageX - dl - block.clientWidth/2;
      var y = e.pageY - dt - block.clientHeight/2;
      move(x, y);
    }
    
    function onDragEnd(e){
      var x = e.pageX - dl - block.clientWidth/2;
      var y = e.pageY - dt - block.clientHeight/2;
      move(x, y);
    }

    function onClick(e){

    }

    return {
    }
  }

  this.Line = function() {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.id = 'line-' + (lineIdx++);

    function moveLeftPoint(x, y){
      line.attributes.x1 = x;
      line.attributes.y1 = y;
      

    }

    function moveRightPoint(x, y){
      line.attributes.x2 = x;
      line.attributes.y2 = y;
    }

    return {
      
    }
  }

}




































// 드래그 이벤트
var cardList = document.querySelectorAll('.card');
var size = cardList.length;
var onDragEnd = function(e1){
    // 기본
    var dom = document.createElement('div').style.zIndex;
    dom.className = 'card block';
    dom.style['z-index'] = 2;
    dom.draggable = true;
    
    var label = document.createElement('div');
    label.className = 'label';
    label.innerHTML = e1.currentTarget.attributes['data-name'].value;
    // label.draggable = true;
    dom.appendChild(label);
    
    // 이동
    dom.style.left = (e1.pageX-50) + 'px';
    dom.style.top = (e1.pageY-50) + 'px';

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