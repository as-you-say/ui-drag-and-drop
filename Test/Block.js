var Block = function(){
    var blockDOM = document.createElement('div');
    blockDOM.style.position = 'absolute';

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

        // DOM - Set top
        setTop: function(y){
            var height = blockDOM.clientHeight;
            blockDOM.style.top = (y+height/2)+'px';
        },

        // DOM Event - Set dragstart event function
        onDragStart: function(event){
            blockDOM.addEventListener('dragstart', event);
        },

        // DOM Event - Set drag event function
        onDrag: function(event){
            blockDOM.addEventListener('drag', event);
        },

        // DOM Event - Set dragend event function
        onDragEnd: function(event){
            blockDOM.addEventListener('dragend', event);
        },
    }
}