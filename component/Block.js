var nowNext;

var Block = function(target, innerHTML){
    // Dom - Drag Block
    var blockMenu = document.getElementById(target);
    blockMenu.draggable= true;
    blockMenu.style.cursor = 'move';
    
    // Dom - Block Shadow
    var block = document.createElement('div');
    document.body.appendChild(block);
    block.className = 'block'
    block.draggable = true;
    block.style.opacity = 0;
    block.style.position = 'absolute';
    block.innerHTML = innerHTML;

    // Event - Block Shadow
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
        // Dom - Block Shadow
        block.style.left = e.pageX - block.clientWidth/2 + 'px';
        block.style.top = e.pageY - block.clientHeight/2 + 'px';

        // Dom - Block + prev + next
        var newBlock = block.cloneNode(true);
        var prev = document.createElement('div');
        var next = document.createElement('div');
        newBlock.appendChild(prev);
        newBlock.appendChild(next);
        document.body.appendChild(newBlock);
        block.style.opacity = 0;
        
        // Event - Block
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

        // Event - prev
        prev.className = 'point prev';
        prev.addEventListener('click', function(e2){
            prev.className = 'point prev on';

            // SVG 태그에 라인 생성
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            document.getElementById('svg').appendChild(line);
            line.setAttribute("stroke", "black");

            // 왼쪽 포인트
            var np = nowNext.getBoundingClientRect();
            line.setAttribute('x1', np.x+10);
            line.setAttribute('y1', np.y+10);

            // 오른쪽 포인트
            var pp = prev.getBoundingClientRect();
            line.setAttribute('x2', pp.x+10);
            line.setAttribute('y2', pp.y+10);
        })

        // Event - next
        next.className = 'point next';
        next.addEventListener('click', function(e2){
            next.className = 'point next on';
            nowNext = next;
            console.log('시작점', e2);
        })
    })
}
