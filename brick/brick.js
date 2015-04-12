(function(doc){
    var box = doc.querySelector('#bricks'),
        ball = doc.querySelector('#ball'),
        board = doc.querySelector('#board'),
        bricks = doc.querySelectorAll('#bricks li');

    var MX = 0, // 横向位移速度
        MY = 0; // 横向位移速度

    function moveBall() {
        var top = parseInt(ball.style.top), left = parseInt(ball.style.left);
        ball.style.left = left + MX + 'px';
        ball.style.top = top + MY + 'px';
    }
    
    var target = bricks;
    // 将target转换成真正的数组
    // target = Array.prototype.slice.call(target, 0);

    function impact() {
         for (var i = 0; i < target.length; i++) {

             var curStyle =getComputedStyle(target[i]), 
                 t_left = parseInt(target[i].style.left),
                 t_top = parseInt(target[i].style.top),
                 t_width = parseInt(curStyle['width']) + 2,
                 t_height = parseInt(curStyle['height']) + 2,
                 b_left = parseInt(ball.style.left),
                 b_top = parseInt(ball.style.top),
                 b_width = 12,
                 b_height = 12;

             // 砖块是否已被打掉
             var isDis =target[i].style.display != 'none';  

             // 与砖块底边相撞
             if (b_top <= t_top + t_height && b_left >= t_left - 5 && b_left < t_left + t_width - 1 && isDis) {
                 target[i].style.display = 'none';
                 console.log('bottom');
                 MY = -MY;
                 break;
                 
             // 与砖块左边相撞
             } else if (b_top >= t_top && b_top <= t_top + t_height && b_left >= t_left - b_width && b_left <= t_left && isDis) {
                 target[i].style.display = 'none';
                 console.log('left');
                 MX = -MX;
                 break;
                 
             // 与砖块右边相撞
             } else if (b_top > t_top && b_top < t_top + t_height && b_left > t_left && b_left < t_left + t_width && isDis) {
                 target[i].style.display = 'none';
                 console.log('right');
                 MX = -MX;
                 break;

             // 与弹板相撞
             } else if (b_top >= 217 && b_left >= parseInt(board.style.left) - 5 && b_left <= parseInt(board.style.left) + 85 && MY > 0) {
                 MY = -MY;
                 break;

             // 与box右边相撞
             } else if (b_left >= 400 - 12 && b_left <= 400) {
                 MX = -MX;
                 break;

             // 与box左边相撞
             } else if (b_left > 0 && b_left <= 1) {
                 MX = -MX;
                 break;

             // 与box上边相撞
             } else if (b_top >= 0 && b_top < 1.5 ) {
                 MY = -MY;
                 break;

             } else if (b_top > 250 - 12) {
                 window.clearInterval(timer);
                 break;
             }
        }
        moveBall();
    }

    function start() {
        timer = window.setInterval(function() {
            impact();
        }, 50);
    }
    
    doc.querySelector('#board').onclick = start;

    //弹板的移动 
    window.onkeydown = function(e) {
        var boardLeft = parseInt(board.style.left);
        if (e.keyCode == 37 && boardLeft > 0) {
            if (typeof isStart == 'undefined') {
                MX = -2;
                MY = -2.5;
                start();
                isStart = true;
            }
            board.style.left = boardLeft - 5 +'px';
        } else if (e.keyCode == 39 && boardLeft < 320) {
            if (typeof isStart == 'undefined') {
                MX = 2;
                MY = -2.5;
                start();
                isStart = true;
            }
            board.style.left = boardLeft + 5 +'px';
        }
    }

})(document)
