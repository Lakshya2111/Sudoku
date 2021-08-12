var store=0;
var count=3;
var prev=[0];
var paused=false;
var disable=[];
var ans='';
var que='';
var now=[];
var mistake=0;
function game_grid(){
    document.getElementById('show_answer').disabled=true;
    document.getElementById('pause').disabled=true;
    document.getElementById('hint').disabled=true;

    var count=1;
    for (let i=0;i<81;i++){
        var cell = document.createElement('input');
        cell.className='grid';
        if (i<9){
        cell.setAttribute('class','grid top');
        }
        if (i>=18 & i<27){
        cell.setAttribute('class','grid bottom');
        }
        if (i>=45 & i<54){
        cell.setAttribute('class','grid bottom');
        }
        if (i>=72 & i<81){
        cell.setAttribute('class','grid bottom');
        }
        cell.id=count;
        count++;
        document.getElementById('game').append(cell);
        cell.disabled=true;
        cell.value='';
    }
}

function generate(){
    now=[];
    mistake=0;
    document.getElementById('hint').disabled=false;
    count=3;
    document.getElementById('avl_hints').innerHTML='Available Hints&nbsp '+count;
    document.getElementById('done').innerHTML='';
    document.getElementById('show_answer').disabled=false;
    document.getElementById('mistake').innerHTML='Mistakes: '+ mistake;
    document.getElementById('pause').innerHTML='Pause';
    document.getElementById('pause').disabled=false;
    paused=false;
    document.getElementById("timer").innerHTML = 'Time Elapsed 00:00';
    disable=[];
    for (let i=0;i<81;i++)
        document.getElementById(i+1).disabled=true;
    let difficulty = document.getElementById('difficulty').value;
    let temp=question(difficulty);
    que=temp[0];
    ans=temp[1];
    for (let i=0;i<81;i++){
        var cell = document.getElementById(i+1);
        if (que[i]=='-'){
            cell.setAttribute('maxlength','1');
            cell.setAttribute('oninput','check(this.id)');
            cell.setAttribute('type', 'text');
            cell.setAttribute('onmouseover','convert(this.id)');
            cell.setAttribute('onmouseout','revert()');
            cell.setAttribute('onFocus','put(this.id)');
            cell.disabled=false;
            cell.value='';
        }
        else{
            disable.push(cell.id);
            cell.value=que[i];
        }

    }
    Clock.reset();
    Clock.start();
}

function check(id) {
    document.getElementById('done').innerHTML='';
    Clock.resume();
    document.getElementById('show_answer').disabled=false;
    let temp = document.getElementById(id);
    if (temp.value<=9 && temp.value>0 || temp.value=='' && !paused){
        if (temp.value!=ans[id-1] && temp.value!=''){
            temp.style.color='red';
            mistake++;
            document.getElementById('mistake').innerHTML='Mistakes: '+ mistake;
            if (document.getElementById('show_answer').disabled){
                document.getElementById('show_answer').disabled=false;
                Clock.resume();
            }
        }
        else{
            flag=true;
            for (let i=0;i<81;i++){
                let temp=document.getElementById(i+1);
                if(temp.value!=ans[i]){
                    flag=false;
                    break
                }
            }
            if (flag){
                document.getElementById('show_answer').disabled=true;
                let s=document.getElementById('timer').textContent
                let mist='mistake';
                if (mistake>1) mist+='s';
                document.getElementById('done').innerHTML='Finished with '+mistake+' ' +mist+ ' in '+s.slice(12,s.length)+' time.';
                Clock.pause();
            }
            temp.style.color='black';
        }
    }
    else{
        temp.value='';
    }

  }
function put(id){
    store=id;
    revert();
    convert(id);
}

function convert(id){
    bg_color = '#caf0f8';
    let r = Math.floor((id - 1) / 9) * 9;
    let c = (id - 1) % 9;
    let block_r = Math.floor(Math.floor((id - 1) / 9) / 3);
    let block_c = Math.floor(c / 3);
    for (let i=r;i<r+9;i++){
        document.getElementById(i+1).style.backgroundColor = bg_color;
    }
    for (let i=c;i<81;i+=9){
        document.getElementById(i+1).style.backgroundColor = bg_color;
    }
    for(let j=0;j<27;j+=9){
        let start = block_r*3*9 + block_c*3;
        for (let i=start;i<start+3;i++){
            document.getElementById(i+1+j).style.backgroundColor = bg_color;
        }
    }
    document.getElementById(id).style.backgroundColor = '#48cae4';
}
function revert(){
    for (let i=0;i<81;i++){
        if (document.getElementById(i+1).disabled){
            document.getElementById(i+1).style.backgroundColor = '#fffffc';
        }
        else{
            document.getElementById(i+1).style.backgroundColor = 'white';
        }
    }
}

function pause(){
    if (!que.length) return;
    if (!paused){
        document.getElementById('pause').innerHTML='Resume';
        for (let i=0;i<81;i++){
            let temp=document.getElementById(i+1);
            if (temp.value==''){ now.push('-');}
            else{
            now.push(temp.value);
            temp.value='';}
            temp.disabled=true;

        Clock.pause();
        paused=true
    }}
    else{
    Clock.resume();
    for (let i=0;i<81;i++){
        let temp=document.getElementById(i+1);
        if (now[i]!='-') temp.value=now[i];
        else temp.value='';
        temp.disabled=false;
    }
    for(let i=0;i<disable.length;i++) {
        let temp=document.getElementById(disable[i]);
        temp.disabled=true;
    }
    now=[];
    document.getElementById('pause').innerHTML='Pause';
    paused=false
    }
}

function place(id){
    if (store==0) return;
    if (id=='one') if (!paused) document.getElementById(store).value=1;
    if (id=='two') if (!paused) document.getElementById(store).value=2;
    if (id=='three') if (!paused) document.getElementById(store).value=3;
    if (id=='four') if (!paused) document.getElementById(store).value=4;
    if (id=='five') if (!paused) document.getElementById(store).value=5;
    if (id=='six') if (!paused) document.getElementById(store).value=6;
    if (id=='seven') if (!paused) document.getElementById(store).value=7;
    if (id=='eight') if (!paused) document.getElementById(store).value=8;
    if (id=='nine') if (!paused) document.getElementById(store).value=9;
    check(store);
}
function hint(){
    ok=true;
    for(let i=0;i<prev.length;i++){
        if (store==prev[i]){
            ok=false;
            break
        }
    }
    if (ok){
        prev.push(store);
        let hints = document.getElementById(store);
        if (hints.value!=ans[store-1]){
        count--;
        if (count>=0){
            hints.value=ans[store-1];
            hints.style.color='black';
            document.getElementById('avl_hints').innerHTML='Available Hints&nbsp '+count;
            check(store);
        }
        if (count==0){
            document.getElementById('hint').disabled=true;
        }
    }

}
    }


function answer(){
    for (let i=0;i<81;i++){
        let temp=document.getElementById(i+1);
        if (temp.disabled) continue;
        temp.value=ans[i];
        temp.style.color='black';
        temp.disabled=true;
    }
    document.getElementById('pause').disabled=true;
    document.getElementById('show_answer').disabled=true;
    document.getElementById('done').innerHTML='Better luck next time.';
    Clock.pause();

}

var Clock = {
    totalSeconds: 0,
    flag:false,
    start: function () {
      var self = this;

      this.interval = setInterval(function () {
        self.totalSeconds += 1;
        hours=(Math.floor(self.totalSeconds / 3600));
        minutes=(Math.floor(self.totalSeconds / 60 % 60));
        seconds=(self.totalSeconds % 60);
        if (minutes<10){
            minutes='0'+minutes;
        }
        if (seconds<10){
            seconds='0'+seconds;
        }
        if (self.flag){
            if (hours<10){
                hours='0'+hours;
            }
            document.getElementById("timer").innerHTML = 'Time Elapsed '+ hours +":"+minutes + ":" + seconds;
        }
        else
        document.getElementById("timer").innerHTML = 'Time Elapsed '+ minutes + ":" + seconds;
        if (minutes==59 && seconds==59){
            self.flag=true;
        }

      }, 1000);
    },

    pause: function () {
      clearInterval(this.interval);
      delete this.interval;
    },

    reset: function () {
        Clock.totalSeconds=0;
        Clock.flag=false;
        clearInterval(this.interval);

    },

    resume: function () {
      if (!this.interval) this.start();
    }
  };
