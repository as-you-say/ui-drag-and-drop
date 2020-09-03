// 테스트 완료
var ws = new Workspace('test');

// 테스트 완료
var block1 = new Block(ws);
var block2 = new Block(ws);

// 테스트 완료
ws.addBlock(block1);
ws.addBlock(block2);

// 테스트 완료 - 라인 좌표수정 필요합니다.
ws.connect(block1, block2);

