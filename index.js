if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}
Element.prototype._getBoundingClientRect = Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = function () {
  const rect = Element.prototype._getBoundingClientRect.call(this)
  rect.x = rect.left
  rect.y = rect.top
  return rect
}
/*global DataTransfer, DragEvent */

/*! setDragImage-IE - polyfill for setDragImage method for Internet Explorer 10+
 https://github.com/MihaiValentin/setDragImage-IE */

/**
 * this method preloads the image, so it will be already loaded when we will use it as a drag image
 * @param image
 */
window.setDragImageIEPreload = function(image) {
  var bodyEl,
      preloadEl;

  bodyEl = document.body;

  // create the element that preloads the  image
  preloadEl = document.createElement('div');
  preloadEl.style.background = 'url("' + image.src + '")';
  preloadEl.style.position = 'absolute';
  preloadEl.style.opacity = 0.001;

  bodyEl.appendChild(preloadEl);

  // after it has been preloaded, just remove the element so it won't stay forever in the DOM
  setTimeout(function() {
      bodyEl.removeChild(preloadEl);
  }, 5000);
};

// if the setDragImage is not available, implement it
if ('function' !== typeof DataTransfer.prototype.setDragImage) {
  DataTransfer.prototype.setDragImage = function(image, offsetX, offsetY) {
      var randomDraggingClassName,
          dragStylesCSS,
          dragStylesEl,
          headEl,
          parentFn,
          eventTarget;

      // generate a random class name that will be added to the element
      randomDraggingClassName = 'setdragimage-ie-dragging-' + Math.round(Math.random() * Math.pow(10, 5)) + '-' + Date.now();

      // prepare the rules for the random class
      dragStylesCSS = [
          '.' + randomDraggingClassName,
          '{',
          'background: url("' + image.src + '") no-repeat #fff 0 0 !important;',
          'width: ' + image.width + 'px !important;',
          'height: ' + image.height + 'px !important;',
          'text-indent: -9999px !important;',
          'border: 0 !important;',
          'outline: 0 !important;',
          '}',
          '.' + randomDraggingClassName + ' * {',
          'display: none !important;',
          '}'
      ];
      // create the element and add it to the head of the page
      dragStylesEl = document.createElement('style');
      dragStylesEl.innerText = dragStylesCSS.join('');
      headEl = document.getElementsByTagName('head')[0];
      headEl.appendChild(dragStylesEl);

      /*
      since we can't get the target element over which the drag start event occurred
      (because the `this` represents the DataTransfer object and not the element),
      we will walk through the parents of the current functions until we find one
      whose first argument is a drag event
       */
      parentFn = DataTransfer.prototype.setDragImage.caller;
      while (!(parentFn.arguments[0] instanceof DragEvent)) {
          parentFn = parentFn.caller;
      }

      // then, we get the target element from the event (event.target)
      eventTarget = parentFn.arguments[0].target;
      // and add the class we prepared to it
      eventTarget.classList.add(randomDraggingClassName);

      /* immediately after adding the class, we remove it. in this way the browser will
      have time to make a snapshot and use it just so it looks like the drag element */
      setTimeout(function() {
          // remove the styles
          headEl.removeChild(dragStylesEl);
          // remove the class
          eventTarget.classList.remove(randomDraggingClassName);
      }, 0);
  };
}
var Block = function(workspace, innerHTML){
  var blockDOM = document.createElement('div');
  blockDOM.className='block'
  blockDOM.draggable = 'true';

  if(innerHTML !== undefined) {
    blockDOM.innerHTML = innerHTML;
  }

  var moveLeftLine = function(e){};
  var moveRightLine = function(e){};

  blockDOM.addEventListener('click', function(e){
    var isNotSelected = (document.querySelector('.block.start') === null);
    if (isNotSelected) {
      blockDOM.className = 'block on start';
      isSelected = true;
    } else {
      blockDOM.className = 'block on end';
      isSelected = false;

      var start = document.querySelector('.block.start');
      var end = document.querySelector('.block.end');
      
      workspace.connect(start, end);

      start.classList.remove('start');
      end.classList.remove('end');
    }
  });


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
      blockDOM.style.left = (x-width/2)+'px';
    },
    getWidth: function(){
      return blockDOM.clientWidth;
    },

    // DOM - Set top
    setTop: function(y){
      var height = blockDOM.clientHeight;
      blockDOM.style.top = (y-height/2)+'px';
    },
    getHeight: function(){
      return blockDOM.clientHeight;
    },

    setClass: function(className){
      blockDOM.className = className;
    },

    // DOM Event - Set dragstart event function
    onDragStart: function(event){
      blockDOM.addEventListener('dragstart', function(e){
        event(e);
        moveLeftLine(e);
        moveRightLine(e);
        blockDOM.className = 'block';
      });
    },

    // DOM Event - Set drag event function
    onDrag: function(event){
      blockDOM.addEventListener('drag', function(e){
        event(e);
        moveLeftLine(e);
        moveRightLine(e);
        blockDOM.className = 'block on';
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
        
    },

    // DOM Event - Set move left line event function
    onMoveLeftLine: function(event){
      moveLeftLine = event;
    },

    // DOM Event - Set move right line event function
    onMoveRightLine: function(event){
      moveRightLine = event;
    }
  }
}
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
      },
      
  }
}
var Menu = function(ws, id, innerHTML){
  var menuDOM = document.getElementById(id);
  var block = {};
  menuDOM.addEventListener('dragstart',function(e){
    block = new Block(ws, innerHTML);
    ws.addBlock(block);
    var img = document.createElement("img");
    e.dataTransfer.setDragImage(img, 0, 0);
  })
  menuDOM.addEventListener('drag',function(e){
    block.setLeft(e.pageX);
    block.setTop(e.pageY);
    block.setClass('block on');
  })
  menuDOM.addEventListener('dragend',function(e){
    block.setLeft(e.pageX);
    block.setTop(e.pageY);
  })
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
  var start = undefined;
  var end = undefined;

  // DOM Setting
  var workspace = document.getElementById(target);
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
          console.log(e);
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

          line.setX1(startBlock.getBoundingClientRect().x + 100);
          line.setY1(startBlock.getBoundingClientRect().y + 100);
          line.setX2(endBlock.getBoundingClientRect().x + 100);
          line.setY2(endBlock.getBoundingClientRect().y + 100);

          // DOM Event - set line move event
          startBlockConponent = blocks.filter(function(o){return o.id === startBlockId;})[0].component;
          startBlockConponent.onMoveRightLine(function(e){
            line.setX1(e.pageX);
            line.setY1(e.pageY);
          })

          endBlockConponent = blocks.filter(function(o){return o.id === endBlockId;})[0].component;
          endBlockConponent.onMoveLeftLine(function(e){
              line.setX2(e.pageX);
              line.setY2(e.pageY);
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
      },
      addBlock: addBlock
  }
}