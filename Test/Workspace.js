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
            blockId: '',
            blockComponent: function(){}
        }
    ];
    var lineSeq = 0;
    var lines = [
        {
            lineId: '',
            lineComponent: function(){}
        }
    ];
    var connectSeq = 0;
    var connects = [
        {
            connectId: '',
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

    return {
        // Block - add/remove
        addBlock: function(newBlockComponent){
            // ID - Generate
            var id = 'b' + (blockSeq++);
            newBlockComponent.setId(id);

            // DOM - Append to workspace
            workspace.appendChild(newBlockComponent.getDOM());

            // Status - Add block status to blocks
            blocks.push({
                blockId: id,
                blockComponent: newBlockComponent
            });
        },
        removeBlock: function(blockId){
            // Block - Remove block status and component
            blocks.filter(function(block, i){
                var isTargetBlock = (block.id === blockId);
                if (isTargetBlock) {
                    blocks.splice(i, 1);
                    block.blockComponent.remove();
                }
            });

            // Connect - Remove connect status
            connects.filter(function(connect, i){
                var isTargetConnection = (connect.block.id === blockId);
                if (isTargetConnection) {
                    connects.splice(i, 1);
                }
            });
        },

        // Line - add/remove
        addLine: function(newLineComponent){
            // ID - Generate
            var id = 'l' + (lineSeq++);
            newLineComponent.setId(id);

            // DOM - Append to line area
            lineArea.appendChild(newLineComponent.getDom());

            // Status - Add line status to lines
            lines.push({
                lineId: id,
                lineComponent: newLineComponent
            });
        },
        removeLine: function(lineId){
            // Line - Remove line status and component
            lines.filter(function(line, i){
                var isTargetLine = (line.id === lineId);
                if (isTargetLine) {
                    lines.splice(i, 1);
                    line.lineComponent.remove();
                }
            });

            // Connect - Remove connect status
            connects.filter(function(connect, i){
                var isTargetConnect = (connect.line.id === lineId);
                if (isTargetConnect) {
                    connects.splice(i, 1);
                }
            });
        },
        
        // Connect - add/remove
        addConnect: function(startBlockId, endBlockId, lineId){
            // ID - Generate
            var id = 'c' + (connectSeq++);

            // Status - Add connect status to connects
            connects.push({
                connectId: id,
                startBlockId: startBlockId,
                endBlockId: endBlockId,
                lineId: lineId
            });
        },
        removeConnect: function(connectId){
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