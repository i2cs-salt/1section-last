let sorted = false;
let map = [];
let count = 0;


/*
新しい配列を作成する

引数,戻り値共になし
*/
function init() {
    /*初期化開始*/
    let array = [];
    map = [];
    count = 0;
    document.getElementById('count').innerHTML = count;
    frame = 0;
    sorted = false;
    /*初期化ここまで*/

    let length = parseInt(document.getElementById('length').innerHTML);
    for (let i = 1; i <= length; i++) {
        array.push(i);
    }
    array = shuffle(array);
    sorted = selectionSort(array);
    draw();
}
/*
渡された配列の中身をシャッフルして返却する

引数:int[],戻り値:int[]
*/
function shuffle(array) {
    let index;
    for (let i = 0; i <= array.length; i++) {
        index = getrandomInt(Array.length);
        [array[i], array[index]] = [array[index], array[i]];
    }
    return array;
}

/*
0以上引数未満の数値を返却する

引数:int,戻り値:int
*/
function getrandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*
選択ソートの実装部分

引数:int[]
戻り値:bool
*/
function selectionSort(array) {
    record(false, -1, -1, 0, array.length - 1, array, -1)
    for (let i = 0; i < array.length; i++) {
        let min = i;
        let swaped = false;
        for (let j = i + 1; j <= array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
                swaped = true;
            }
            record(false, min, j, i, array.length - 1, array, min);
        }
        swap(i, min, array);
        //引数leftにminではなくiを入れるのはswap関数によって最小値が入れ替わっているから
        record(swaped, i, min, i, array.length - 1, array, min);
    }
    record(false, -1, -1, 0, array.length - 1, array, -1);
    return true;
}

/*
配列内移動(交換)

引数
left:int(index)
right:int(index)
arrayint[](index)
戻り値:int[]
*/
function swap(left, right, array) {
    let tmp = array[left];
    array[left] = array[right];
    array[right] = tmp;
    return array;
}

/*
sortの経過を記録する

引数
swaped:交換したか
left:現在の最小値(index)
right:比較対象(index)
start:スタート位置(index)
end:エンド位置(index)
arrray:配列内容
戻り値:なし
*/
function record(swaped, left, right, start, end, array, min_index) {
    map.push({
        array: array.concat(),
        range: {
            start: start,
            end: end,
        },
        selected: right,
        swaped: swaped,
        swap: {
            left: left,
            right: right,
        },
        min_index: min_index,
    });
}

/*
Canvasのsetup

引数,戻り値共に無し
*/
function setup(){
    let canvas = createCanvas(420, 400);
    canvas.parent('canvas');
    frameRate(15);
    background(color(212, 236, 234));
    init();
}

/*
描画

引数,戻り値共に無し
*/
function draw(){
    if(sorted && frame < map.length){
        background(color(212, 236, 234));
        let mapStatus = map[frame];
        drawRange(mapStatus.range);
        drawBar(mapStatus.array, mapStatus.selected, mapStatus.swaped, mapStatus.swap, mapStatus.min_index);
        if(mapStatus.swaped){
            count++;
            document.getElementById('count').innerHTML = count;
        }

        frame++;
    }
}

/*
走査範囲の描画

引数:struct{x,y}
戻り値:無し
*/
function drawRange(range){
    const grid_pixel = 10;
    const marin_left = 4;
    
    let x = (grid_pixel + marin_left) * range.start + 2;
    const y = 20;
    let width = (grid_pixel + marin_left) * (range.end - range.start + 1);
    const height = 360;
    //図形の周りに線を描く
    stroke(222, 246, 244);
    fill(color(222, 246, 244));
    rect(x, y, width, height);
}

function drawBar(array, selected, swaped, swap, min_index){
    const under = 350;
    const grid_pixel = 10;
    const margin_left = 4;
    const len = array.length;
    
    for(let i = 0;i < len; i++){
        let left = (grid_pixel + margin_left) * i + 2;
        let height = grid_pixel * array[i];
        
        stroke(0, 0, 0);

        
        if(i === selected){
            fill(color(191, 164, 65));
        }else{
            fill(color(237, 235, 213));
        }
        if (i === min_index && !swaped) {
            fill(color('blue'))
        }
        if(swaped){
            if(i === swap.left){
                fill(color(65, 156, 192));
            }else if(i === swap.right){
                fill(color(191, 65, 155));
            }
        }
        
        rect(left, under - height, grid_pixel, height);
        fill(color(50, 50, 50));
        rect(left, under- height, grid_pixel, grid_pixel);
    }
}
