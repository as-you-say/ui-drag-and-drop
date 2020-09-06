# 드래그 앤 드롭 라이브러리

## 예제코드
``` html
<aside id="sidebar">
  <div id="data" draggable="true">드래그해봐요~</div>
</aside>
<section id="contents"></section>
<script>
  var ws = new Workspace('contents');
  new Menu(ws, 'data', '<span>헬로헬로~</span>');
</script>
```
