var Block = function(target, innerHTML){
    var blockMenu = document.getElementById(target);
    blockMenu.draggable= true;
    blockMenu.style.cursor = 'move';
    
    var block = document.createElement('div');
    document.body.appendChild(block);
    block.className = 'block'
    block.draggable = true;
    block.style.opacity = 0;
    block.style.position = 'absolute';
    block.innerHTML = innerHTML;

    blockMenu.addEventListener('dragstart', function(e){
        var img = document.createElement("img");
        e.dataTransfer.setDragImage(img, 0, 0);
    })
    blockMenu.addEventListener('drag', function(e){
        block.style.opacity = 1;
        block.style.left = e.pageX - block.clientWidth/2 + 'px';
        block.style.top = e.pageY - block.clientHeight/2 + 'px';
    })
    blockMenu.addEventListener('dragend', function(e){
        block.style.left = e.pageX - block.clientWidth/2 + 'px';
        block.style.top = e.pageY - block.clientHeight/2 + 'px';

        var newBlock = block.cloneNode(true);
        document.body.appendChild(newBlock);
        block.style.opacity = 0;
        newBlock.addEventListener('dragstart', function(e2){
            var img = document.createElement("img");
            e2.dataTransfer.setDragImage(img, 0, 0);
        })
        newBlock.addEventListener('drag', function(e2){
            newBlock.style.left = e2.pageX - newBlock.clientWidth/2 + 'px';
            newBlock.style.top = e2.pageY - newBlock.clientHeight/2 + 'px';
        })
        newBlock.addEventListener('dragend', function(e2){
            newBlock.style.left = e2.pageX - newBlock.clientWidth/2 + 'px';
            newBlock.style.top = e2.pageY - newBlock.clientHeight/2 + 'px';
        })
    })
}



