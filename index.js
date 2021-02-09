
// spalo maker webhook refer csv example

const bcrypt = require('bcryptjs')
const fs = require('fs')
const csvSync = require('csv-parse/lib/sync')


exports.wh_search_sample_csv = (req, res) => {

  if (req.body.webhookKey) {

    // check by webhookKey
    const webhookKey = '85126C79CBF9FE36BB9D05D0639C70C235C18D37'
    if(req.body.webhookKey === webhookKey){
      
      let filename = "list.csv"

      const item_name = req.body.item_name

      async function main() {

        let result = []
        
        const file = fs.readFileSync(filename)

        let csv = csvSync(file, {relax_column_count: true})

        for (let i = 0; i < csv.length; i++) {

          if(item_name === csv[i][0]){

            result = csv[i].slice(1)
            break
          
          }

        }
        
        if(Array.isArray(result)){

          res.setHeader("Content-Type", "application/json")
          res.send(result)

        }else{

          res.status(400).send("Could not get data")

        }

      }

      main()

    } else {

      res.status(401).send("Unauthorized")

    }

  } else {

    res.send("OK")

  }

}



