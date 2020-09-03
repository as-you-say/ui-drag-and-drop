var Menu = function(ws, id, innerHTML){
  var menuDOM = document.getElementById(id);
  var block = {};
  menuDOM.addEventListener('dragstart',function(e){
    block = new Block(ws, innerHTML);
    ws.addBlock(block);
    var img = document.createElement("img");
    e.dataTransfer.setDragImage(img, 0, 0);
  })
  menuDOM.addEventListener('drag',function(e){
    block.setLeft(e.pageX);
    block.setTop(e.pageY);
    block.setClass('block on');
  })
  menuDOM.addEventListener('dragend',function(e){
    block.setLeft(e.pageX);
    block.setTop(e.pageY);
  })
}