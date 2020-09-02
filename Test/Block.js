var Block = function(){
    var blockDOM = document.createElement('div');
    blockDOM.style.position = 'absolute';

    return {
        // DOM - Append to workspace
        append: function(workspace){
            workspace.appendChild(blockDOM);
        },

        // DOM - Remove from workspace
        remove: function(){
            blockDOM.remove();
        },

        // DOM - Return DOM
        getDOM: function(){
            return blockDOM;
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
    }
}