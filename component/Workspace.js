var Workspace = function(target){
    // DOM Status
    var blockSeq = 0;
    var blocks = [
        {
            id: '',
            component: {}
        }
    ];
    var lineSeq = 0;
    var lines = [
        {
            id: '',
            component: {}
        }
    ];
    var connectSeq = 0;
    var connects = [
        {
            id: '',
            startBlockId: '',
            endBlockId: '',
            lineId: ''
        }
    ];

    // DOM Setting
    var workspace = document.getElementById(target);
    var dl = workspace.getBoundingClientRect().x;
    var dt = workspace.getBoundingClientRect().y;
    var lineArea = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lineArea.id = 'lineArea';
    lineArea.style.position = 'relative';
    lineArea.style.width = '100%';
    lineArea.style.height = '100%';

    workspace.appendChild(lineArea);

    // Line - add/remove
    function addLine(startBlock, endBlock){
        // Component - Generate
        var newLine = new Line();
        
        // ID - Generate
        var id = 'l' + (lineSeq++);
        newLine.setId(id);

        // DOM - Append to line area
        newLine.appendTo(lineArea);

        // Status - Add line status to lines
        lines.push({
            id: id,
            component: newLine
        });

        return newLine;
    }
    function removeLine(lineId){
        // Line - Remove line status and component
        lines.filter(function(line, i){
            var isTargetLine = (line.id === lineId);
            if (isTargetLine) {
                lines.splice(i, 1);
                line.component.remove();
            }
        });

        // Connect - Remove connect status
        connects.filter(function(connect, i){
            var isTargetConnect = (connect.line.id === lineId);
            if (isTargetConnect) {
                connects.splice(i, 1);
            }
        });
    }

    // Block - add/remove
    function addBlock(newBlock){
        // ID - Generate
        var id = 'b' + (blockSeq++);
        newBlock.setId(id);

        // DOM - Append to workspace
        newBlock.appendTo(workspace);

        // DOM Event - Dragstart / Drag / Dragend
        newBlock.onDragStart(
          function(e){
            img = document.createElement("div");
            e.dataTransfer.setDragImage(img, 0, 0);
          }
        );
        newBlock.onDrag(
          function(e){
            newBlock.setLeft(e.pageX-dl);
            newBlock.setTop(e.pageY-dt);
          }
        );
        newBlock.onDragEnd(
          function(e){
            newBlock.setLeft(e.pageX-dl);
            newBlock.setTop(e.pageY-dt);
          }
        );

        // Status - Add block status to blocks
        blocks.push({
            id: id,
            component: newBlock
        });

        return id;
    }

    function removeBlock(blockId){
        // Block - Remove block status and component
        blocks.filter(function(block, i){
            var isTargetBlock = (block.id === blockId);
            if (isTargetBlock) {
                blocks.splice(i, 1);
                block.component.remove();
            }
        });

        // Connect - Remove connect status and line component
        connects.filter(function(connect, i){
            var isTargetConnection = (connect.startBlockId === blockId || connect.endBlockId === blockId);
            if (isTargetConnection) {
                lines.filter(function(line, i){
                    var isTargetLine = (line.id === connect.lineId);
                    if (isTargetLine) {
                        lines.splice(i, 1);
                        line.component.remove();
                    }
                });
                connects.splice(i, 1);
            }
        });
    }

    return {
        // Connect - add/remove
        connect: function(startBlock, endBlock){
          // Component - Add line/startBlock/endBlock Component
          var line = addLine(startBlock, endBlock);
          var startBlockId = startBlock.id;
          var endBlockId = endBlock.id;

          // ID - Generate
          var id = 'c' + (connectSeq++);

          // Status - Add connect status to connects
          connects.push({
              id: id,
              startBlockId: startBlockId,
              endBlockId: endBlockId,
              lineId: line.id
          });

          // DOM Event - set line move event
          startBlockConponent = blocks.filter(function(o){return o.id === startBlockId;})[0].component;
          startBlockConponent.onMoveRightLine(function(e){
            line.setX1(e.pageX - dl);
            line.setY1(e.pageY - dt);
          })

          endBlockConponent = blocks.filter(function(o){return o.id === endBlockId;})[0].component;
          endBlockConponent.onMoveLeftLine(function(e){
            line.setX2(e.pageX - dl);
            line.setY2(e.pageY - dt);
          })

          line.setX1(startBlock.getBoundingClientRect().x - dl + startBlockConponent.getWidth()/2);
          line.setY1(startBlock.getBoundingClientRect().y - dt + startBlockConponent.getHeight()/2);
          line.setX2(endBlock.getBoundingClientRect().x - dl + endBlockConponent.getWidth()/2);
          line.setY2(endBlock.getBoundingClientRect().y - dt + endBlockConponent.getHeight()/2);
        },
        disconnect: function(connectId){
          // Line - Remove connect status
          connects.filter(function(connect, i){
              var isTargetConnect = (connect.id === connectId);
              if (isTargetConnect) {
                  connects.splice(i, 1);
              }
          });
        },
        addBlock: addBlock,
        getDeltaLeft: function(){
          return dl;
        },
        getDeltaTop: function(){
          return dt;
        }
    }
}



