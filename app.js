const express = require('express')

const app  = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false})); 
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept,Authorization,authorization,content-type');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); 
})


app.get('/',(req , res , next) =>{  // path /

    res.status(200).json({
        message : 'Get rootdd /'
    })
})

app.post('/api/firstfactorial' , (req ,res ,next) => {
    let firstfactorial = (num) =>{
        if(num == 0) return 1 ;
		else if(num == 1) return 1 ;
		else {
			return num * firstfactorial(num-1);
		}
    }
    let num = req.body.input ;
    let ans = firstfactorial(num)
    res.status(200).json({
        output : ans
    })
})

app.post('/api/rirstreverse' , (req ,res ,next) => {
    let rirstreverse = (str) =>{
        let reStr = "";
        for(let i = str.length-1 ; i>=0; i--)
        {
            reStr += str[i];

        }
        //console.log(reStr)
        return reStr ;
    }
    let str = req.body.input ;
    let ans = rirstreverse(str)
    res.status(200).json({
        output : ans
    })

})

app.post('/api/alphabetsoup' , async (req ,res ,next) => {
    let AlphabetSoup = async (str) =>{
        let arrStr = [] ;
        
        for (let i = 0; i < str.length; i++) {
            arrStr[i] = str[i];            
        }
        for (let i = 0; i < arrStr.length -1 ; i++) 
		{
            for(let j = 0 ; j < arrStr.length-1-i ; j++)			
            {
               
				if(arrStr[j].charCodeAt(0) > arrStr[j+1].charCodeAt(0)) 
				{
					let temp = arrStr[j+1] ;					
					arrStr[j+1] = arrStr[j] ;		
                    arrStr[j] = temp ;
				}
            }
        }
        str ="";
        for (let i = 0; i < arrStr.length; i++) {
            str += arrStr[i]
        }
        return str ;
    }
    let str = req.body.input ;
    let ans = await AlphabetSoup(str)
    res.status(200).json({
        output : ans
    })
})

module.exports = app
