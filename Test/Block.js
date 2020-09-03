var Block = function(){
    var blockDOM = document.createElement('div');
    blockDOM.style.position = 'absolute';

    var moveLeftLine = function(e){};
    var moveRightLine = function(e){};

    return {
        // DOM - Append to workspace
        appendTo: function(workspace){
            workspace.appendChild(blockDOM);
        },

        // DOM - Remove from workspace
        remove: function(){
            blockDOM.remove();
        },

        // DOM - Set ID
        setId:function(id){
            blockDOM.id = id;
        },

        // DOM - Set left
        setLeft: function(x){
            var width = blockDOM.clientWidth;
            blockDOM.style.left = (x+width/2)+'px';
        },
        getWidth: function(){
            return blockDOM.clientWidth;
        },

        // DOM - Set top
        setTop: function(y){
            var height = blockDOM.clientHeight;
            blockDOM.style.top = (y+height/2)+'px';
        },
        getHeight: function(){
            return blockDOM.clientHeight;
        },

        // DOM Event - Set dragstart event function
        onDragStart: function(event){
            blockDOM.addEventListener('dragstart', function(e){
                event(e);
                moveLeftLine(e);
                moveRightLine(e);
            });
        },

        // DOM Event - Set drag event function
        onDrag: function(event){
            blockDOM.addEventListener('drag', function(e){
                event(e);
                moveLeftLine(e);
                moveRightLine(e);
            });
        },

        // DOM Event - Set dragend event function
        onDragEnd: function(event){
            blockDOM.addEventListener('dragend', function(e){
                event(e);
                moveLeftLine(e);
                moveRightLine(e);
            });
        },

        // DOM Event - Set click event function
        onClick: function(workspace, event){
            blockDOM.addEventListener('click', function(e){
                var isNotSelected = (document.querySelector('.block.start') === null);
                if (isNotSelected) {
                    blockDOM.className = 'block start';
                    isSelected = true;
                } else {
                    blockDOM.className = 'block end';
                    isSelected = false;

                    var start = document.querySelector('.block.start');
                    var end = document.querySelector('.block.end');
                    
                    workspace.connect(start, end);

                    start.classList.remove('start');
                    end.classList.remove('end');
                }

                event(e);
            });
        },

        // DOM Event - Set move left line event function
        onMoveLeftLine: function(event){
            moveLeftLine = event;
        },

        // DOM Event - Set move right line event function
        onMoveRightLine: function(event){
            moveRightLine = event;
        },
    }
}