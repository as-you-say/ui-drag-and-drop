var Line = function(){
    var lineDOM = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineDOM.setAttribute("stroke", "black");

    return {
        // DOM - Append to lineArea
        appendTo:function(lineArea){
            lineArea.appendChild(lineDOM);
        },

        // DOM - Remove from lineArea
        remove: function(){
            lineDOM.remove();
        },

        // DOM - Set ID
        setId:function(id){
            lineDOM.id = id;
        },

        // DOM - Set x1
        setX1:function(x1){
            lineDOM.setAttribute('x1', x1);
        },

        // DOM - Set y1
        setY1:function(y1){
            lineDOM.setAttribute('y1', y1);
        },

        // DOM - Set x2
        setX2:function(x2){
            lineDOM.setAttribute('x2', x2);
        },

        // DOM - Set y2
        setY2:function(y2){
            lineDOM.setAttribute('y2', y2);
        }
    }
}