import Replicate from "replicate";
import fs from 'fs';
var d = await fs.readFileSync('sites.txt');
var row = 'name,link,description,countries available, type of service'+"\r\n";
d = d.toString().split("\n");
for(var i =0;i<=1000;i++){
  const r =await search('does '+d[i]+' accept crypto currencies?');

  
  if(r.indexOf('not')<0){
    row += d[i].split('.')[0].charAt(0).toUpperCase()+d[i].split('.')[0].slice(1)+','+d[i]+','+await search('if '+d[i]+' accept crypto currencies, describe '+d[i]+' in one line')+','+await search('what are the countries '+d[i]+' provide its service in one line')+','+await search('what kind of services '+d[i]+' provide in one line')+"\r\n";
    console.log(row);
    console.log(i);
  }
    
}
//console.log(row);
await fs.writeFileSync('data.csv',row);

//console.log(await search('what kind of services '+d[2]+' provide in one line'));

async function search(entry, wallet=false){
    const replicate = new Replicate({
      auth: 'r8_an4ZcqtvF0i3vrWhOOc4kSDAOWzbCJM27FYFf'
    });
    
    const input = {
        prompt: entry
      };
      var str = '';
    
      for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
        str += event.toString();
        //console.log(event.toString());
      };
      if(wallet==false){
        return str;
    
      }else{
        return str.match(/(\b0x[a-f0-9]{40}\b)/g);
    
      }
    }
