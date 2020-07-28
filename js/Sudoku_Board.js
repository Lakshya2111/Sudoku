function valid_row(grid,row,col,num){
    for(let i=0;i<9;i++){
        if (grid[row][i]==num){
            return false;
        }
    }
    return true;
}
function valid_col(grid,row,col,num){
    for(let i=0;i<9;i++){
        if (grid[i][col]==num){
            return false;
        }
    }
    return true;
}
function valid_box(grid,row,col,num){
    row-=row%3;
    col-=col%3;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
        if (grid[row+i][col+j]==num){
            return false;
        }
    }}
    return true;
}

function safe(grid,row,col,num){
    return valid_box(grid,row,col,num) && valid_col(grid,row,col,num) && valid_row(grid,row,col,num);
}
function rand(min,max){
    return Math.floor(Math.random() * (max-min+1))+min;
}

function create_grid(row,col){
    var grid=[];
    for(let i=0;i<row;i++){
        let temp=[];
        for (let i=0;i<col;i++)
            temp.push(0);
        grid.push(temp)
    
}   
    return grid;
}


function generate_board(grid){
    for(let step=0;step<9;){
        var row=step;
        var col=step;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                while(true){
                    let x=rand(1,9);
                   if (safe(grid,row+i,col+j,x)){
                        grid[row+i][col+j]=x;
                        break;
                    }
                }
                
        }}
        step+=3;
    }
        
        return grid;}


function empty(grid){
    for(let i=0;i<9;i++)
        for(let j=0;j<9;j++)
            if (grid[i][j]==0)
                return [i,j];
    return [-1,-1];
}

function solver(grid){
    let cell=empty(grid);
    let col=cell[1];
    let row=cell[0];
    if (row==-1){
        return true;}
    for(let i=1;i<10;i++){
        if (safe(grid,row,col,i)){
            grid[row][col]=i;
            if (solver(grid))
                return true;
            grid[row][col]=0;
        }
    }
    return false;
}

function equal(a,b){
    return a[0]==b[0] && a[1]==b[1];
}

function make(mini,maxi){
    var grid=create_grid(9,9);
    grid=generate_board(grid);
    solver(grid);
    var ans=create_grid(9,9);
    for(let i=0;i<9;i++)
        for(let j=0;j<9;j++)
            ans[i][j]=grid[i][j];
    
    let k = rand(mini,maxi);
    var removed=[];
    for(let i=0;i<k;i++){
        while(true){
            let cell=rand(0,80);
            let row=Math.floor(cell/9);
            let col=cell%9;
            let flag=1;
            for(let step=0;step<removed.length;step++){
                if (equal([row,col],removed[step])){
                    flag=0;
                    break;
                }
            }
            if (flag==1){
                removed.push([row,col]);
                grid[row][col]=0;
                break
            }
            
        }

    }
    return [grid,ans];
}

function question(difficulty){
    if (difficulty=='easy')
        var temp=make(25,40);
    if (difficulty=='medium')
        var temp=make(40,55);
    if (difficulty=='hard')
        var temp=make(55,70);
    let grid='';
    let ans='';
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            ans+=temp[1][i][j];
            if (temp[0][i][j]==0) grid+='-';
            else grid+=temp[0][i][j];
        }
    }
    return [grid,ans]
}
