// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

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
    var lineArea = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lineArea.id = 'lineArea';
    workspace.appendChild(lineArea);

    // Line - add/remove
    function addLine(){
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
                var img = document.createElement("img");
                e.dataTransfer.setDragImage(img, 0, 0);
            }
        );
        newBlock.onDrag(
            function(e){
                newBlock.setLeft(e.pageX);
                newBlock.setTop(e.pageY);
            }
        );
        newBlock.onDragEnd(
            function(e){
                newBlock.setLeft(e.pageX);
                newBlock.setTop(e.pageY);
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
            var line = addLine();
            var startBlockId = addBlock(startBlock);
            var endBlockId = addBlock(endBlock);

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
            startBlock.onMoveRightLine(function(e){
                line.setX1(e.pageX + startBlock.getWidth());
                line.setY1(e.pageY + startBlock.getHeight()/2);
            })
            endBlock.onMoveLeftLine(function(e){
                line.setX2(e.pageX);
                line.setY2(e.pageY + endBlock.getHeight()/2);
            })
        },
        disconnect: function(connectId){
            // Line - Remove connect status
            connects.filter(function(connect, i){
                var isTargetConnect = (connect.id === connectId);
                if (isTargetConnect) {
                    connects.splice(i, 1);
                }
            });
        }
    }
}



