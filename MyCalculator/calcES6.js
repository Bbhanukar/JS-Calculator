class calculator{};
calculator.operate= function(a,b,op){
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
calculator.precedance=function(op){
    if(op=='-'|| op=='+')
        return 1;
    if(op=='/'|| op=='*')
        return 2;
    return 0;
}
calculator.calculate=function(str){

    while(str.length==0){
        str=prompt("no expression entered,\n enter the expression to calculate,  \n!!only integers allowed");
    }
    const operators=['+','-','*','/'];
    const operands=['1','2','3','4','5','6','7','8','9','0','(',')']

    let ops=[];
    let nums=[];
    for(let i=0;i<str.length;i++){

        if(!operands.includes(str[i]) && !operators.includes(str[i])){
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
            let num=Number(str[i]);
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
                let num1= nums.pop();
                let num2= nums.pop();

                let op=ops.pop();

                let val=this.operate(num2,num1,op);
                nums.push(val);
            }
            if(ops.length!=0){ops.pop()};
        }
        else{
            while(ops.length!=0 && this.precedance(ops[ops.length-1])>=this.precedance(str[i])){
                let num1=nums.pop();
                let num2=nums.pop();

                let op=ops.pop();

                let val=this.operate(num2,num1,op);
                nums.push(val);
            }
            ops.push(str[i]);
        }
    }

    while(ops.length!=0){
        let num1= nums.pop();
        let num2=nums.pop();

        let op=ops.pop();
        let val=this.operate(num2,num1,op);
        nums.push(val)
    }
    return nums.pop();
}
let str=prompt("enter the expression to calculate, \n !!only integers allowed");
//console.log(calculator.precedance(op));
alert(calculator.calculate(str));