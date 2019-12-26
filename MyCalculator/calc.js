
var str=prompt("enter the expression to calculate, \n !!only integers allowed");
//var str="100 * ( 2 + 12/6 +3) "

function operate(a,b,op){
    switch(op){
        case '+':
            return a+b;
            break;

        case '-':
            return a-b;
            break;

        case '*':
            return a*b;
            break;

        case '/':
            return a/b;
            break;
    }
}

function precedance(op){
    if(op=='-'|| op=='+')
        return 1;
    if(op=='/'|| op=='*')
        return 2;
    return 0;
}


function calculate(str){

    while(str.length==0){
        str=prompt("no expression entered,\n enter the expression to calculate,  \n!!only integers allowed");
    }
    var operators=['+','-','*','/'];
    var numbers=['1','2','3','4','5','6','7','8','9','0','(',')']

    var ops=[];
    var nums=[];
    for(var i=0;i<str.length;i++){

        if(!numbers.includes(str[i]) && !operators.includes(str[i])){
            return ("enter integers only");
        }
        if(operators.includes(str[i]) && operators.includes(str[i+1])){
            return ("check your expression");
        }

        if(str[i]==' '){
            continue;
        }

        else if(str[i]=='('){
            ops.push(str[i]);
        }

        else if(!isNaN(Number(str[i]))){
            var num=Number(str[i]);
            while(!isNaN(Number(str[i+1]))){
                if(str[i+1] === " ") break;
                //alert(str[i+1]);
                i++;
                //alert("--"+i+"__"+num);
                num=Number(num)*10 +Number(str[i]);
                //alert("++"+i+"__"+num);
            }
            //alert(".."+i+"__"+num);
            nums.push(num);
        }

        else if(str[i]==')'){
            while(ops.length!=0 && ops[ops.length-1]!='('){
                var num1= nums.pop();
                var num2= nums.pop();

                var op=ops.pop();

                var val=operate(num2,num1,op);
                nums.push(val);
            }
            if(ops.length!=0){ops.pop()};
        }
        else{
            while(ops.length!=0 && precedance(ops[ops.length-1])>=precedance(str[i])){
                var num1=nums.pop();
                var num2=nums.pop();

                var op=ops.pop();

                var val=operate(num2,num1,op);
                nums.push(val);
            }
            ops.push(str[i]);
        }
    }

    while(ops.length!=0){
        var num1= nums.pop();
        var num2=nums.pop();

        var op=ops.pop();
        var val=operate(num2,num1,op);
        nums.push(val)
    }
    return nums.pop();
}
//console.log(calculate(str));
alert(calculate(str));
