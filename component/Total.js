var Workspace = function(target){
    // DOM Status
    var blockSeq = 0;
    var blocks = [
        {
            blockId: '',
            blockDOM: function(){}
        }
    ];
    var lineSeq = 0;
    var lines = [
        {
            lineId: '',
            lineDOM: function(){}
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
        addBlock: function(newBlock){
            // ID
            var id = 'b' + (blockSeq++);
            newBlock.id = id;

            // DOM
            workspace.appendChild(newBlock);

            // Status
            blocks.push({
                blockId: id,
                blockDOM: newBlock
            });
        },
        removeBlock: function(blockId){
            blocks.filter(function(block, i){
                var isTargetBlock = (block.id === blockId);
                if (isTargetBlock) {
                    blocks.splice(i, 1);
                }
            });
            connects.filter(function(connect, i){
                var isTargetConnection = (connect.block.id === blockId);
                if (isTargetConnection) {
                    connects.splice(i, 1);
                }
            });
        },

        // Line - add/remove
        addLine: function(newLine){
            // ID - Generate
            var id = 'l' + (lineSeq++);
            newLine.id = id;

            // DOM - Append to workspace
            workspace.appendChild(newLine);

            // Status - Add line status to lines
            lines.push({
                lineId: id,
                lineDOM: newLine
            });
        },
        removeLine: function(lineId){
            lines.filter(function(line, i){
                var isTargetLine = (line.id === lineId);
                if (isTargetLine) {
                    lines.splice(i, 1);
                }
            });
            connects.filter(function(connect, i){
                var isTargetConnect = (connect.line.id === lineId);
                if (isTargetConnect) {
                    connects.splice(i, 1);
                }
            });
        },
        
        // Connect - add/remove
        addConnect: function(startBlockId, endBlockId, lineId){
            // ID
            var id = 'c' + (connectSeq++);

            // Status
            connects.push({
                connectId: id,
                startBlockId: startBlockId,
                endBlockId: endBlockId,
                lineId: lineId
            });
        },
        removeConnect: function(connectId){
            connects.filter(function(connect, i){
                var isTargetConnect = (connect.id === connectId);
                if (isTargetConnect) {
                    connects.splice(i, 1);
                }
            });
        }
    }
}