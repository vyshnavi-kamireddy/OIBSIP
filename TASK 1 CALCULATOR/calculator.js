let calculation=localStorage.getItem('calculation')||"";
document.querySelector('.display').innerHTML=calculation;

document.body.addEventListener('keydown',(event)=>{
    if(event.key=='Backspace')
    {
        update('DEL');
    }
    else if(event.key=='=')
    {
        update('=');
    }
    else if(event.key=='+')
    {
        update('+');
    }
    else if(event.key=='-')
    {
        update('-');
    }
    else if(event.key=='*')
    {
        update('*');
    }
    else if(event.key=='/')
    {
        update('/');
    }
    else if(event.key=='%')
    {
        update('%');
    }
    else if(typeof(JSON.parse(event.key))=='number')
    {
        update(event.key);
    }
})
function update(input)
{
    if(input=='=')
    {
        calculation=eval(calculation);
    }
    else if(input=='DEL')
    {
        calculation=calculation.slice(0,-1);
    }
    else
    {
        calculation+=input;
    }
    localStorage.setItem('calculation',calculation);
    document.querySelector('.display').innerText=calculation;
}