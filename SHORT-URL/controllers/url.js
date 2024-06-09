const shortid = require('shortid');
const URL = require('../model/url')


async function handleGenerateNewShortURl(req,res){

  const body = req.body;
  if(!body.url) return res.status(400).json({error:"URl required"});
  //generating short id
  const shortId = shortid();

  await URL.create({
    shortId:shortId,
    redirectUrl:body.url,
    visitHistory:[],
     
  })
  return res.json({id:shortId})

}

module.exports ={ handleGenerateNewShortURl}