async function getCollection(){
  let url= `/api/collection/getcollection`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export{getCollection};