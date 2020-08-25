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

// 라이브러리
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
    function onMouseDown(e){
      block.style.border = '1px solid #333';
    }
    function onMouseUp(e){
      block.style.border = 'none';
    }

    block.addEventListener('drag', onDrag);
    block.addEventListener('dragend', onDragEnd);
    block.addEventListener('mousedown', onMouseDown);
    block.addEventListener('mouseup', onMouseUp);

    return {
    }
  }

  this.Line = function() {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.id = 'line-' + (lineIdx++);

    return {
      remove: function(){
        line.remove();
      },
      left: function(x, y){
        line.attributes.x1 = x;
        line.attributes.y1 = y;
      },
      right: function(x, y){
        line.attributes.x2 = x;
        line.attributes.y2 = y;
      }
    }
  }

}


document.querySelector('#test').addEventListener('drag');